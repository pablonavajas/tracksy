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
    field_id = data.get('id')
    if field_id is None:
        serializer = Serializer(data=data)
    else:
        instance = getattr(startup, field).get(pk=field_id)
        serializer = Serializer(instance=instance, data=data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return serializer.data


def list_processor(request, startupId, Serializer, field):
    data = request.data
    if type(data) is not list:
        raise ValidationError("Expecting a list for this API")

    response = {"added": [], "errors": []}
    startup = get_startup(request.user, pk=startupId)
    for data_item in data:
        try:
            response["added"].append(process_field(data_item, startup, Serializer, field))
        except ValidationError as err:
            response["errors"].append(err.detail)
        except ObjectDoesNotExist as err:
            response["errors"].append({"message": str(err)})

    return response


class InvestmentAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, startupId):
        response = list_processor(request, startupId, InvestmentSerializer, "investments")
        return Response(response)

    def delete(self, request, startupId, pk):
        startup = get_startup(request.user, pk=startupId)
        investment = startup.investments.get(pk=pk)
        investment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class KpiNameAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, startupId):
        response = list_processor(request, startupId, KpiNameSerializer, "kpinames")
        return Response(response)

    def delete(self, request, startupId, pk):
        startup = get_startup(request.user, startupId)
        kpiName = startup.kpinames.get(pk=pk)
        kpiName.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class FinancialAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, startupId):
        startup = get_startup(request.user, pk=startupId)
        response = process_field(request.data, startup, FinancialSerializer, "financials")
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
