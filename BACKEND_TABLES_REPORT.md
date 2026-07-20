# Backend Tables Report

This report lists every table currently present in the Django backend database at `django-backend/db.sqlite3`.

## Summary

- Total tables: 17
- Custom app tables: 6
- Django built-in tables: 11

## Custom App Tables

These tables come from `django-backend/api/models.py`.

| Table | Model | Purpose |
| --- | --- | --- |
| `api_profile` | `Profile` | Stores user avatar/profile data. |
| `api_video` | `Video` | Stores backend video records and metadata. |
| `api_comment` | `Comment` | Stores comments linked to videos and users. |
| `api_trackingevent` | `TrackingEvent` | Stores tracking and interaction events. |
| `api_uservideostate` | `UserVideoState` | Stores per-client video progress and save state. |
| `api_passwordresettoken` | `PasswordResetToken` | Stores password reset codes and expiry data. |

## Django Built-in Tables

These tables are created by Django itself.

| Table | Purpose |
| --- | --- |
| `auth_group` | Stores permission groups. |
| `auth_group_permissions` | Links groups to permissions. |
| `auth_permission` | Stores model permissions. |
| `auth_user` | Stores user accounts. |
| `auth_user_groups` | Links users to groups. |
| `auth_user_user_permissions` | Links users to direct permissions. |
| `django_admin_log` | Stores Django admin action logs. |
| `django_content_type` | Stores content type metadata. |
| `django_migrations` | Tracks applied migrations. |
| `django_session` | Stores session data. |
| `sqlite_sequence` | Internal SQLite autoincrement tracking table. |

## Notes

- The custom app tables are the ones defined in your backend code.
- The built-in Django tables are part of the framework and are expected in a standard project.
- If you want, I can also turn this into a CSV, Excel-friendly table, or a presentation slide.