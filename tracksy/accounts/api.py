from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.serializers import AuthTokenSerializer

from django.contrib.auth import login
from django.core.exceptions import FieldError

from knox.views import LoginView as KnoxLoginView
from knox.auth import TokenAuthentication

from .serializers import UserSerializer, RegisterSerializer, ConnectionSerializer
from .models import Info


# API for retrieving a User's account
class UserAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class RegisterAPI(KnoxLoginView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        try:
            isStartup = request.data["isStartup"]
        except KeyError:
            raise FieldError("'isStartup' field not provided")

        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        Info.objects.create(user=user, isStartup=isStartup)

        login(request, user)
        response = super(RegisterAPI, self).post(request, format=None)
        response.data.update(UserSerializer(user).data)
        return response


class LoginAPI(KnoxLoginView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        response = super(LoginAPI, self).post(request, format=None)
        response.data.update(UserSerializer(user).data)
        return response


class IsStartUpAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response(request.user.info.isStartup)


class ConnectionsAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        connections = request.user.connections.all()
        serializer = ConnectionSerializer(connections, many=True)
        return Response(serializer.data)

    def post(self, request):
        connections = request.data['connections']
        connectionIds = []
        for connection in connections:
            connection['user'] = request.user.pk
            serializer = ConnectionSerializer(data=connection)
            if serializer.is_valid():
                serializer.save()
                connectionIds.append(serializer.data['id'])
        return Response({"connectionIds": connectionIds})
