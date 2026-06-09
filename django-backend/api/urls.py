from django.urls import path
from . import views

urlpatterns = [
    path('hello/', views.hello_world),
    path('auth/google-config/', views.auth_google_config),
    path('auth/register/', views.auth_register),
    path('auth/login/', views.auth_login),
    path('auth/profile/', views.auth_profile),
    path('auth/google/', views.auth_google),
    path('auth/apple/', views.auth_apple),
    path('auth/forgot-password/', views.auth_forgot_password),
    path('auth/reset-password/', views.auth_reset_password),
    path('tracking/event/', views.tracking_event),
    path('tracking/snapshot/', views.tracking_snapshot),
]
