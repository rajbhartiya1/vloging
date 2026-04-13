from django.http import JsonResponse

def root_view(request):
    return JsonResponse({'message': 'Welcome to the Django API Root!', 'status': 'success'})

def hello_world(request):
    return JsonResponse({'message': 'Hello, world!', 'status': 'success'})
