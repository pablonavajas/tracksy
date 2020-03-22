from startups.models import Startup
from rest_framework import viewsets, permissions
from .serializers import StartupSerializer


# Lead Viewset (crud API, without specifying requests, managed by django)
class StartupViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated  # for now anybody can access any startups
    ]

    serializer_class = StartupSerializer

    def get_queryset(self):
        return self.request.user.startups.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
