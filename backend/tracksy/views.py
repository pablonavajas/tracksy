from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse

from rest_framework import viewsets

from .serializers import StartupsSerializers, UsersSerializers
from .models import Startups, Users


def index(request):
    return HttpResponse("Hello, world. You're at the index.")

class StartupsViewSet(viewsets.ModelViewSet):
    queryset = Startups.objects.all().order_by('name')
    serializer_class = StartupsSerializers

class UsersViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all().order_by('user_id')
    serializer_class = UsersSerializers
