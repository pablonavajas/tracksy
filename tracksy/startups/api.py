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


def get_startup(user, pk=None):
    """ Returns startup object using startupId in the request,
            throws error if unable to get the startup """
    if pk is None:
        raise ValidationError("'startupId' not provided")
    startup = user.startups.get(pk=pk)
    return startup


class InvestmentAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        response = {"added": [], "error": []}
        data_list = request.data
        if type(data_list) is dict:
            data_list = [data_list]
        for data in data_list:
            startup = get_startup(request.user, pk=data.get('startupId'))
            investmentId = data.get('id')
            if investmentId is None:
                serializer = InvestmentSerializer(data=data)
            else:
                investment = startup.investments.get(pk=investmentId)
                serializer = InvestmentSerializer(instance=investment, data=data)

            if serializer.is_valid():
                serializer.save()
                response['added'].append(serializer.data)
            else:
                response['error'].append(serializer.data)

        return Response(response)


    def delete(self, request, startupId, pk):
        startup = get_startup(request.user, pk=startupId)
        investment = startup.investments.get(pk=pk)
        investment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class KpiNameAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        response = {"added": [], "error": []}
        data_list = request.data
        if type(data_list) is dict:
            data_list = [data_list]
        for data in data_list:
            startup = get_startup(request.user, data.get('startupId'))
            kpiNameId = data.get('id')
            if kpiNameId is None:
                serializer = KpiNameSerializer(data=data)
            else:
                kpiName = startup.kpinames.get(pk=kpiNameId)
                serializer = KpiNameSerializer(instance=kpiName, data=data)

            if serializer.is_valid():
                serializer.save()
                response["added"].append(serializer.data)
            else:
                response["error"].append(serializer.data)

        return Response(response)

    def delete(self, request, startupId, pk):
        startup = get_startup(request, startupId)
        kpiName = startup.kpinames.get(pk=pk)
        kpiName.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class FinancialAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        startup = get_startup(request.user, request.data.get('startupId'))
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


class InfoAPI(APIView):

    def post(self, request):
        if type(request.data) is list:
            print("this is list")
        print(type(request.data))
        print(type(request.data[0]))
        return Response({"hello":"world"})
