class Video(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    video_file = models.FileField(upload_to='videos/')
    thumbnail = models.ImageField(upload_to='thumbnails/')
    views = models.IntegerField(default=0)
    upload_date = models.DateTimeField(auto_now_add=True)

# Create your views here.
from django.http import JsonResponse

def hello_world(request):
    return JsonResponse({'message': 'Hello from Django Backend!', 'status': 'success'})

def root_view(request):
    return JsonResponse({'message': 'Welcome to the Django API Root!', 'status': 'success'})
