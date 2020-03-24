from startups.models import Startup
from rest_framework import viewsets, permissions
from .serializers import StartupSerializer


# Lead Viewset (crud API, without specifying requests, managed by django)
class StartupViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = StartupSerializer

    # Only return the startups that the user owns
    def get_queryset(self):
        return self.request.user.startups.all()

    # Override perform_create method
    # to save the startup owner when creating a startup.
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
