from django.contrib import admin

from .models import TrackingEvent, UserVideoState, PasswordResetToken


@admin.register(TrackingEvent)
class TrackingEventAdmin(admin.ModelAdmin):
	list_display = ("id", "client_id", "video_id", "event_type", "created_at")
	list_filter = ("event_type", "created_at")
	search_fields = ("client_id", "video_id")


@admin.register(UserVideoState)
class UserVideoStateAdmin(admin.ModelAdmin):
	list_display = ("id", "client_id", "video_id", "progress", "interaction", "in_watch_later", "updated_at")
	list_filter = ("interaction", "in_watch_later", "updated_at")
	search_fields = ("client_id", "video_id")


@admin.register(PasswordResetToken)
class PasswordResetTokenAdmin(admin.ModelAdmin):
	list_display = ("id", "user", "code", "used", "expires_at", "created_at")
	list_filter = ("used", "expires_at", "created_at")
	search_fields = ("user__email", "code")

# Register your models here.
