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

from startups.models import Startup
from rest_framework import viewsets, permissions, generics
from .serializers import *
from .models import *
from rest_framework.response import Response


# Startup Viewset (crud API, without specifying requests, managed by django)
class StartupViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated  # for now anybody can access any startups
    ]

    serializer_class = StartupSerializer

    def get_queryset(self):
        # returns the startup that belongs to the user
        # (this only exists if user is a startup)
        if self.request.user.startup.all():
            return self.request.user.startup.all()

        # returns all the startups in the VC Fund's portfolio
        return self.request.user.portfolio.all()

    def perform_create(self, serializer):
        serializer.save(vcAuthId=self.request.user)


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

    def perform_create(self, serializer):
        serializer.save()
