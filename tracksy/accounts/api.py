from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.views import APIView
from rest_framework.authtoken.serializers import AuthTokenSerializer

from django.contrib.auth import login
from django.core.exceptions import FieldError

from knox.models import AuthToken
from knox.views import LoginView as KnoxLoginView
from knox.auth import TokenAuthentication

from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, ConnectionSerializer
from .models import Info


# API for retrieving a User's account
class UserAPI(APIView):
    
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class RegisterAPI(generics.GenericAPIView):
    authentication_classes = (TokenAuthentication,)
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):

        try:
            isStartup = request.data["isStartup"]
        except KeyError:
            raise FieldError("'isStartup' field not provided")

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        Info.objects.create(user=user, isStartup=isStartup)
        token = AuthToken.objects.create(user)[1]
        user_data = UserSerializer(user, context=self.get_serializer_context()).data
        user_data["token"] = token
        user_data["isStartup"] = user.info.isStartup
        return Response(user_data)


class LoginAPI(KnoxLoginView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginAPI, self).post(request, format=None)


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
