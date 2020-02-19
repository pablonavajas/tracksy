from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse

from rest_framework import viewsets

from .serializers import StartupsSerializers
from .models import Startups


def index(request):
    return HttpResponse("Hello, world. You're at the index.")

class StartupsViewSet(viewsets.ModelViewSet):
    queryset = Startups.objects.all().order_by('name')
    serializer_class = StartupsSerializers
