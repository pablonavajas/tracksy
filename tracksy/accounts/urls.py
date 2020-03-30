from django.urls import path, include
from django.contrib import admin
from .api import *
from knox import views as knox_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth', include('knox.urls')),
    path('api/auth/register', UserAPI.as_view()),
    path('api/auth/login', UserAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/isStartup', IsStartUpAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
]
