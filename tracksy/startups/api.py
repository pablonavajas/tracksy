""" 
    Managment of requests
    Note:
        Startup API to be used to post information first level info (with no nestings)
        Other APIs (e.g. Investment, Finanical, KPI) to be used to post info for other nested level info
        PUT not currently available 
    
    TODO:
        Limit GET for all APIs except the Startup API
        Limit posting additional information to Startups that belong to user
        KpiNames confirm functionality
"""

from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from .serializers import *
from rest_framework.response import Response
from rest_framework.serializers import ValidationError
from rest_framework import status


# Startup Viewset (crud API, without specifying requests, managed by django)
class StartupViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    serializer_class = StartupSerializer

    def get_queryset(self):
        return self.request.user.startups.all()

    def perform_create(self, serializer):
        serializer.save(users=self.request.user)


def get_startup(request, pk=None):
    """ Returns startup object using startupId in the request,
            throws error if unable to get the startup """

    if pk is None:
        pk = request.data.get('startupId')
    if pk is None:
        raise ValidationError("'startupId' not provided")
    startup = request.user.startups.get(pk=pk)
    return startup


class InvestmentAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        startup = get_startup(request)

        id = request.data.get('id')
        data = request.data
        if id is None:
            serializer = InvestmentSerializer(data=data)
        else:
            investment = startup.investments.get(pk=id)
            serializer = InvestmentSerializer(instance=investment, data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, startupId, pk):
        startup = get_startup(request, startupId)
        investment = startup.investments.get(pk=pk)
        investment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class KpiNameAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        get_startup(request)
        serializer = KpiNameSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, startupId, pk):
        startup = get_startup(request, startupId)
        kpiName = startup.kpinames.get(pk=pk)
        kpiName.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class FinancialAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        startup = get_startup(request)
        id = request.data.get('id')
        if id is None:
            serializer = FinancialSerializer(data=request.data)
        else:
            financial_instance = startup.financials.get(pk=id)
            serializer = FinancialSerializer(instance=financial_instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, startupId, pk):
        startup = get_startup(request, startupId)
        financial = startup.financials.get(pk=pk)
        financial.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
