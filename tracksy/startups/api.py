""" 
    Managment of requests
    Note:
        Startup API to be used to post information first level info (with no nestings)
        Other APIs (e.g. Investment, Finanical, KPI) to be used to post info for other nested level info
        PUT not currently available 
    
    TODO:
        Limit GET for all APIs except the Startup API
        Limit posting additional information to Startups that belong to user
"""

from rest_framework import viewsets, permissions
from rest_framework.request import Request
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .serializers import *
from .models import *
from .models import Startup
from rest_framework.response import Response


class InfoView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        print("hello world")
        return Response({'hello': 1})


# Startup Viewset (crud API, without specifying requests, managed by django)
class StartupViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    serializer_class = StartupSerializer

    def get_queryset(self):
        return self.request.user.startups.all()

    def perform_create(self, serializer):
        serializer.save(users=self.request.user)


class InvestmentViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = InvestmentSerializer
    queryset = Investment.objects.all()


class KpiNameViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = KpiNameSerializer
    queryset = KpiName.objects.all()


class KpiViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = KpiSerializer
    queryset = Kpi.objects.all()


class FinancialViewSet(viewsets.ModelViewSet):
    perform_create = [permissions.IsAuthenticated]

    serializer_class = FinancialSerializer
    queryset = Financial.objects.all()

    # Override perform_create method
    # to save the startup owner when creating a startup.
    def perform_create(self, serializer):
        serializer.save()
