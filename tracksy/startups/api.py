""" Managment of requests
    Note:
        PUT not available, use POST instead to edit
    
    TODO:
        Limit GET for invesments
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
        serializer.save(owner=self.request.user)


# class IsStartUpViewSet(generics.RetrieveAPIView):
#     permission_classes = [
#         permissions.IsAuthenticated
#     ]

#     serializer_class = StartupSerializer

#     def get_object(self):
#         isStartup = False
#         if (self.request.user.startup.all()):
#             isStartup = True
#         response = Response({"isStartup": isStartup})
#         return response


# class UserAPI(generics.RetrieveAPIView):
#     permission_classes = [
#         permissions.IsAuthenticated,
#     ]

#     serializer_class = UserSerializer

#     def get_object(self):
#         return self.request.user


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
