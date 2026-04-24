import json
import re
import secrets
import jwt

from django.contrib.auth import get_user_model
from django.conf import settings
from django.core.mail import send_mail
from django.utils import timezone
from django.db import transaction
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from google.oauth2 import id_token as google_id_token
from google.auth.transport import requests as google_requests

from .models import TrackingEvent, UserVideoState, PasswordResetToken

User = get_user_model()
APPLE_JWKS_CLIENT = jwt.PyJWKClient("https://appleid.apple.com/auth/keys")

def root_view(request):
    return JsonResponse({'message': 'Welcome to the Django API Root!', 'status': 'success'})

def hello_world(request):
    return JsonResponse({'message': 'Hello, world!', 'status': 'success'})


def _json_payload(request):
    try:
        return json.loads(request.body or "{}")
    except json.JSONDecodeError:
        return None


def _build_username_from_email(email):
    base = email.split("@")[0].strip().lower()
    base = re.sub(r"[^a-z0-9_]+", "_", base)
    if not base:
        base = "user"

    candidate = base
    index = 1
    while User.objects.filter(username=candidate).exists():
        index += 1
        candidate = f"{base}_{index}"
    return candidate


def _social_auth_response(user, created, provider):
    return JsonResponse(
        {
            "status": "ok",
            "message": "Account created successfully" if created else "Login successful",
            "provider": provider,
            "user": {
                "id": user.id,
                "name": user.first_name or user.username,
                "email": user.email,
            },
        },
        status=201 if created else 200,
    )


def _get_or_create_social_user(email, name):
    user = User.objects.filter(email__iexact=email).first()
    created = False

    if user is None:
        username = _build_username_from_email(email)
        user = User.objects.create_user(
            username=username,
            email=email,
            first_name=name,
            password=None,
        )
        user.set_unusable_password()
        user.save(update_fields=["password"])
        created = True
    elif name and not user.first_name:
        user.first_name = name
        user.save(update_fields=["first_name"])

    return user, created


def _verify_google_token(identity_token):
    claims = google_id_token.verify_oauth2_token(identity_token, google_requests.Request(), None)
    issuer = claims.get("iss")
    if issuer not in {"accounts.google.com", "https://accounts.google.com"}:
        raise ValueError("Invalid Google token issuer")

    allowed_client_ids = {item for item in settings.GOOGLE_OAUTH_CLIENT_IDS if item}
    audience = claims.get("aud")
    if allowed_client_ids and audience not in allowed_client_ids:
        raise ValueError("Google token audience mismatch")

    if claims.get("email_verified") is not True:
        raise ValueError("Google account email is not verified")

    email = str(claims.get("email") or "").strip().lower()
    if not email:
        raise ValueError("Google account is missing an email address")

    display_name = str(claims.get("name") or claims.get("given_name") or "").strip()
    return email, display_name


def _verify_apple_token(identity_token):
    if not settings.APPLE_SERVICES_ID:
        raise ValueError("Apple services ID is not configured")

    signing_key = APPLE_JWKS_CLIENT.get_signing_key_from_jwt(identity_token)
    claims = jwt.decode(
        identity_token,
        signing_key.key,
        algorithms=["RS256"],
        audience=settings.APPLE_SERVICES_ID,
        issuer="https://appleid.apple.com",
    )

    email = str(claims.get("email") or "").strip().lower()
    if not email:
        raise ValueError("Apple account is missing an email address")

    return email


@csrf_exempt
def auth_register(request):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)

    payload = _json_payload(request)
    if payload is None:
        return JsonResponse({"error": "Invalid JSON payload"}, status=400)

    name = str(payload.get("name") or "").strip()
    email = str(payload.get("email") or "").strip().lower()
    password = str(payload.get("password") or "")

    if not name or not email or not password:
        return JsonResponse({"error": "name, email and password are required"}, status=400)

    if len(password) < 6:
        return JsonResponse({"error": "Password must be at least 6 characters"}, status=400)

    if User.objects.filter(email__iexact=email).exists():
        return JsonResponse(
            {
                "error": "Account already exists. Please login.",
                "code": "already_exists",
            },
            status=409,
        )

    username = _build_username_from_email(email)
    user = User.objects.create_user(
        username=username,
        first_name=name,
        email=email,
        password=password,
    )

    return JsonResponse(
        {
            "status": "ok",
            "message": "Registration successful",
            "user": {
                "id": user.id,
                "name": user.first_name or user.username,
                "email": user.email,
            },
        },
        status=201,
    )


@csrf_exempt
def auth_login(request):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)

    payload = _json_payload(request)
    if payload is None:
        return JsonResponse({"error": "Invalid JSON payload"}, status=400)

    email = str(payload.get("email") or "").strip().lower()
    password = str(payload.get("password") or "")

    if not email or not password:
        return JsonResponse({"error": "email and password are required"}, status=400)

    try:
        user = User.objects.get(email__iexact=email)
    except User.DoesNotExist:
        return JsonResponse(
            {
                "error": "Account does not exist. Please register first.",
                "code": "not_found",
            },
            status=404,
        )

    if not user.check_password(password):
        return JsonResponse(
            {
                "error": "Invalid password.",
                "code": "invalid_password",
            },
            status=401,
        )

    return JsonResponse(
        {
            "status": "ok",
            "message": "Login successful",
            "user": {
                "id": user.id,
                "name": user.first_name or user.username,
                "email": user.email,
            },
        }
    )


@csrf_exempt
def auth_google(request):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)

    payload = _json_payload(request)
    if payload is None:
        return JsonResponse({"error": "Invalid JSON payload"}, status=400)

    identity_token = str(payload.get("idToken") or "").strip()
    if not identity_token:
        return JsonResponse({"error": "idToken is required"}, status=400)

    try:
        email, display_name = _verify_google_token(identity_token)
    except Exception:
        return JsonResponse(
            {
                "error": "Invalid Google sign-in token",
                "code": "invalid_google_token",
            },
            status=401,
        )

    user, created = _get_or_create_social_user(email, display_name)
    return _social_auth_response(user, created, "google")


@csrf_exempt
def auth_apple(request):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)

    payload = _json_payload(request)
    if payload is None:
        return JsonResponse({"error": "Invalid JSON payload"}, status=400)

    identity_token = str(payload.get("idToken") or "").strip()
    full_name = str(payload.get("fullName") or "").strip()
    if not identity_token:
        return JsonResponse({"error": "idToken is required"}, status=400)

    try:
        email = _verify_apple_token(identity_token)
    except Exception:
        return JsonResponse(
            {
                "error": "Invalid Apple sign-in token",
                "code": "invalid_apple_token",
            },
            status=401,
        )

    user, created = _get_or_create_social_user(email, full_name)
    return _social_auth_response(user, created, "apple")


@csrf_exempt
def auth_forgot_password(request):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)

    payload = _json_payload(request)
    if payload is None:
        return JsonResponse({"error": "Invalid JSON payload"}, status=400)

    email = str(payload.get("email") or "").strip().lower()
    if not email:
        return JsonResponse({"error": "email is required"}, status=400)

    try:
        user = User.objects.get(email__iexact=email)
    except User.DoesNotExist:
        return JsonResponse(
            {
                "error": "Account does not exist. Please register first.",
                "code": "not_found",
            },
            status=404,
        )

    cooldown_seconds = max(0, int(settings.PASSWORD_RESET_REQUEST_COOLDOWN_SECONDS))
    latest_request = PasswordResetToken.objects.filter(user=user).order_by("-created_at").first()
    if latest_request and cooldown_seconds > 0:
        next_allowed_at = latest_request.created_at + timezone.timedelta(seconds=cooldown_seconds)
        if next_allowed_at > timezone.now():
            retry_after = int((next_allowed_at - timezone.now()).total_seconds())
            response = JsonResponse(
                {
                    "error": "Please wait before requesting another reset code.",
                    "code": "cooldown_active",
                    "retryAfterSeconds": retry_after,
                },
                status=429,
            )
            response["Retry-After"] = str(retry_after)
            return response

    expiry = timezone.now() + timezone.timedelta(minutes=settings.PASSWORD_RESET_CODE_TTL_MINUTES)
    code = f"{secrets.randbelow(900000) + 100000}"

    # Invalidate previously active tokens for this user.
    PasswordResetToken.objects.filter(user=user, used=False).update(used=True)

    PasswordResetToken.objects.create(
        user=user,
        code=code,
        expires_at=expiry,
    )

    try:
        send_mail(
            subject="VlogHub Password Reset Code",
            message=(
                f"Hi {user.first_name or user.username},\n\n"
                f"Your VlogHub password reset code is: {code}\n"
                f"This code expires in {settings.PASSWORD_RESET_CODE_TTL_MINUTES} minutes.\n\n"
                "If you did not request this reset, you can ignore this message."
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            fail_silently=False,
        )
    except Exception:
        return JsonResponse(
            {
                "error": "Could not send reset email. Please try again later.",
                "code": "email_send_failed",
            },
            status=503,
        )

    response = {
        "status": "ok",
        "message": f"Reset code sent to your email. It expires in {settings.PASSWORD_RESET_CODE_TTL_MINUTES} minutes.",
    }

    if settings.DEBUG:
        response["resetCode"] = code

    return JsonResponse(response)


@csrf_exempt
def auth_reset_password(request):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)

    payload = _json_payload(request)
    if payload is None:
        return JsonResponse({"error": "Invalid JSON payload"}, status=400)

    email = str(payload.get("email") or "").strip().lower()
    code = str(payload.get("code") or "").strip()
    new_password = str(payload.get("newPassword") or "")

    if not email or not code or not new_password:
        return JsonResponse({"error": "email, code and newPassword are required"}, status=400)

    if len(new_password) < 6:
        return JsonResponse({"error": "Password must be at least 6 characters"}, status=400)

    try:
        user = User.objects.get(email__iexact=email)
    except User.DoesNotExist:
        return JsonResponse(
            {
                "error": "Account does not exist. Please register first.",
                "code": "not_found",
            },
            status=404,
        )

    token = PasswordResetToken.objects.filter(
        user=user,
        code=code,
        used=False,
        expires_at__gt=timezone.now(),
    ).order_by("-created_at").first()

    if not token:
        return JsonResponse(
            {
                "error": "Invalid or expired reset code.",
                "code": "invalid_reset_code",
            },
            status=400,
        )

    user.set_password(new_password)
    user.save(update_fields=["password"])

    token.used = True
    token.save(update_fields=["used"])

    # Invalidate all other outstanding reset tokens.
    PasswordResetToken.objects.filter(user=user, used=False).exclude(id=token.id).update(used=True)

    return JsonResponse(
        {
            "status": "ok",
            "message": "Password reset successful. Please login with your new password.",
        }
    )


def _resolve_client_id(request):
    header_value = request.headers.get("X-Client-Id")
    if header_value:
        return header_value.strip()[:128]

    query_value = request.GET.get("client_id")
    if query_value:
        return query_value.strip()[:128]

    return None


@csrf_exempt
def tracking_event(request):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)

    client_id = _resolve_client_id(request)
    if not client_id:
        return JsonResponse({"error": "Missing client id"}, status=400)

    try:
        payload = json.loads(request.body or "{}")
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON payload"}, status=400)

    video_id = str(payload.get("videoId") or "").strip()
    event_type = str(payload.get("eventType") or "").strip()

    if not video_id or not event_type:
        return JsonResponse({"error": "videoId and eventType are required"}, status=400)

    if event_type not in {
        TrackingEvent.EVENT_WATCH_PROGRESS,
        TrackingEvent.EVENT_INTERACTION,
        TrackingEvent.EVENT_WATCH_LATER,
    }:
        return JsonResponse({"error": "Unsupported eventType"}, status=400)

    progress = payload.get("progress")
    interaction = payload.get("interaction")
    in_watch_later = payload.get("inWatchLater")

    with transaction.atomic():
        event = TrackingEvent.objects.create(
            client_id=client_id,
            video_id=video_id,
            event_type=event_type,
            progress=progress if isinstance(progress, (int, float)) else None,
            interaction=interaction if interaction in {"like", "dislike", None} else None,
            in_watch_later=in_watch_later if isinstance(in_watch_later, bool) else None,
        )

        state, _ = UserVideoState.objects.get_or_create(
            client_id=client_id,
            video_id=video_id,
        )

        if event_type == TrackingEvent.EVENT_WATCH_PROGRESS and isinstance(progress, (int, float)):
            state.progress = max(0, min(1, float(progress)))

        if event_type == TrackingEvent.EVENT_INTERACTION:
            if interaction in {"like", "dislike"}:
                state.interaction = interaction
            else:
                state.interaction = None

        if event_type == TrackingEvent.EVENT_WATCH_LATER and isinstance(in_watch_later, bool):
            state.in_watch_later = in_watch_later

        state.save()

    return JsonResponse(
        {
            "status": "ok",
            "eventId": event.id,
            "videoId": video_id,
            "clientId": client_id,
        }
    )


def tracking_snapshot(request):
    if request.method != "GET":
        return JsonResponse({"error": "Method not allowed"}, status=405)

    client_id = _resolve_client_id(request)
    if not client_id:
        return JsonResponse({"error": "Missing client id"}, status=400)

    states = UserVideoState.objects.filter(client_id=client_id)

    history = {}
    watch_later = []
    likes = {}

    for entry in states:
        history[entry.video_id] = {
            "videoId": entry.video_id,
            "timestamp": int(entry.updated_at.timestamp() * 1000),
            "progress": entry.progress,
        }
        if entry.in_watch_later:
            watch_later.append(entry.video_id)
        likes[entry.video_id] = entry.interaction

    return JsonResponse(
        {
            "status": "ok",
            "clientId": client_id,
            "data": {
                "history": history,
                "watchLater": watch_later,
                "likes": likes,
            },
        }
    )
