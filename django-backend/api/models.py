from django.db import models

# Create your models here.

from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Video(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    video_url = models.URLField(max_length=500, blank=True, null=True)
    thumbnail_url = models.URLField(max_length=500, blank=True, null=True)
    views = models.PositiveIntegerField(default=0)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Comment(models.Model):
    video = models.ForeignKey(Video, related_name='comments', on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Comment by {self.author} on {self.video}'


class TrackingEvent(models.Model):
    EVENT_WATCH_PROGRESS = "watch_progress"
    EVENT_INTERACTION = "interaction"
    EVENT_WATCH_LATER = "watch_later"

    EVENT_CHOICES = [
        (EVENT_WATCH_PROGRESS, "Watch Progress"),
        (EVENT_INTERACTION, "Interaction"),
        (EVENT_WATCH_LATER, "Watch Later"),
    ]

    client_id = models.CharField(max_length=128, db_index=True)
    video_id = models.CharField(max_length=64, db_index=True)
    event_type = models.CharField(max_length=32, choices=EVENT_CHOICES)
    progress = models.FloatField(null=True, blank=True)
    interaction = models.CharField(max_length=16, null=True, blank=True)
    in_watch_later = models.BooleanField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.client_id}:{self.video_id}:{self.event_type}"


class UserVideoState(models.Model):
    INTERACTION_LIKE = "like"
    INTERACTION_DISLIKE = "dislike"

    INTERACTION_CHOICES = [
        (INTERACTION_LIKE, "Like"),
        (INTERACTION_DISLIKE, "Dislike"),
    ]

    client_id = models.CharField(max_length=128, db_index=True)
    video_id = models.CharField(max_length=64, db_index=True)
    progress = models.FloatField(default=0)
    interaction = models.CharField(max_length=16, choices=INTERACTION_CHOICES, null=True, blank=True)
    in_watch_later = models.BooleanField(default=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["client_id", "video_id"], name="unique_client_video_state"),
        ]
        ordering = ["-updated_at"]

    def __str__(self):
        return f"{self.client_id}:{self.video_id}"


class PasswordResetToken(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="password_reset_tokens")
    code = models.CharField(max_length=6)
    expires_at = models.DateTimeField()
    used = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def is_valid(self):
        return (not self.used) and timezone.now() < self.expires_at

    def __str__(self):
        return f"{self.user.email}:{self.code}:{'used' if self.used else 'active'}"

