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
from django.core.exceptions import ObjectDoesNotExist
from .angel_get import get_description


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


def process_field(data, startup, Serializer, field):
    data['startupId'] = startup.pk
    try:
        field_id = data.get('id')
        if field_id is None:
            serializer = Serializer(data=data)
        else:
            instance = getattr(startup, field).get(pk=field_id)
            serializer = Serializer(instance=instance, data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return serializer.data
    except (ValidationError, ObjectDoesNotExist) as err:
        print("Error ({}) when adding object: {}".format(err, data))

def startup_field_proccesor(request, startupId, Serializer, field, many=True):
    data = request.data
    startup = get_startup(request.user, pk=startupId)
    if many is True:
        if type(data) is dict:
            data = [data]
        for data_item in data:
            process_field(data_item, startup, Serializer, field)
        query = getattr(startup, field).all()
        serializer = Serializer(data=query, many=many)
        serializer.is_valid()
        return serializer.data
    else:
        return process_field(data, startup, Serializer, field)



class InvestmentAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, startupId):
        response = startup_field_proccesor(request, startupId, InvestmentSerializer,
                                           "investments", many=True)
        return Response(response)

    def delete(self, request, startupId, pk):
        startup = get_startup(request.user, pk=startupId)
        investment = startup.investments.get(pk=pk)
        investment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class KpiNameAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, startupId):
        response = startup_field_proccesor(request, startupId, KpiNameSerializer,
                                           "kpinames", many=True)
        return Response(response)

    def delete(self, request, startupId, pk):
        startup = get_startup(request.user, startupId)
        kpiName = startup.kpinames.get(pk=pk)
        kpiName.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class FinancialAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, startupId):
        response = startup_field_proccesor(request, startupId, FinancialSerializer,
                                           "financials", many=False)
        return Response(response)

    def delete(self, request, startupId, pk):
        startup = get_startup(request.user, startupId)
        financial = startup.financials.get(pk=pk)
        financial.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class AngelJobAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        job_description = get_description(request.data['url'])
        return Response(job_description)
