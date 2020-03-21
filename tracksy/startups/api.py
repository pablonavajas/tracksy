from startups.models import Startup
from rest_framework import viewsets, permissions
from .serializers import StartupSerializer


# Lead Viewset (crud API, without specifying requests, managed by django)
class StartupViewSet(viewsets.ModelViewSet):
    queryset = Startup.objects.all()
    permission_classes = [
        permissions.AllowAny  # for now anybody can access any startups
    ]
    serializer_class = StartupSerializer
