from django.shortcuts import render
from django.http import HttpResponse
from datetime import datetime

def dashboard(request):
    """Dashboard view - shows the user's notes and main interface"""
    context = {
        'current_time': datetime.now(),
        'user': {'username': 'Demo User'},  # Simulated user data
        'note_count': 3,
    }
    return render(request, 'note_app/dashboard.html', context)

def login_view(request):
    """Login view - handles user authentication"""
    if request.method == 'POST':
        # In a real app, you would authenticate here
        username = request.POST.get('username')
        password = request.POST.get('password')
        # Simulate successful login
        return render(request, 'note_app/dashboard.html', {'user': {'username': username}})
    
    return render(request, 'note_app/login.html')

def register_view(request):
    """Register view - handles new user registration"""
    if request.method == 'POST':
        # In a real app, you would create the user here
        username = request.POST.get('username')
        email = request.POST.get('email')
        # Simulate successful registration
        return render(request, 'note_app/dashboard.html', {'user': {'username': username}})
    
    return render(request, 'note_app/register.html')

def home(request):
    """Home view - shows the main landing page"""
    return render(request, 'note_app/base.html')