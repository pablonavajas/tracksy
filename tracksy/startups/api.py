""" Managment of requests
    Note:
        PUT not available, use POST instead to edit
    
    TODO:
        Limit GET for invesments
"""

from startups.models import Startup
from rest_framework import viewsets, permissions
from .serializers import *
from .models import *


# Startup Viewset (crud API, without specifying requests, managed by django)
class StartupViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated  # for now anybody can access any startups
    ]

    serializer_class = StartupSerializer

    def get_queryset(self):
        return self.request.user.startups.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class InvestmentViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = InvestmentSerializer
    queryset = Investment.objects.all()


class KpiViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = KpiNameSerializer
    queryset = KpiName.objects.all()
