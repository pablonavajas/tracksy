from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from django.contrib.auth import authenticate
from django.core.exceptions import FieldError
from rest_framework import serializers
from knox.models import AuthToken
from .serializers import UserSerializer
from .models import Info


class UserAPI(APIView):
    # Get user info
    def get(self, request):
        print(request.user.is_authenticated)
        if request.user.is_authenticated:
            serializer = UserSerializer(request.user)
            data = serializer.data
            data['isStartup'] = request.user.info.isStartup
            return Response(data)
        raise serializers.ValidationError("Not Logged In")

    # Register
    def post(self, request):
        try:
            isStartup = request.data.pop('isStartup')
        except KeyError:
            raise FieldError("'isStartup' field not provided")
        serializer_user = UserSerializer(data=request.data)
        serializer_user.is_valid(raise_exception=True)
        user = serializer_user.save()
        Info.objects.create(user=user, isStartup=isStartup)
        token = AuthToken.objects.create(user)[1]
        data = serializer_user.data
        data['token'] = token
        data['isStartup'] = user.info.isStartup
        return Response(data)


class LoginAPI(APIView):
    def post(self, request):
        user = authenticate(**request.data)
        if user is not None:
            token = AuthToken.objects.create(user)[1]
            serializer = UserSerializer(user)
            data = serializer.data
            data['token'] = token
            data['isStartup'] = user.info.isStartup
            return Response(data)
        raise serializers.ValidationError("Incorrect Credentials")


class IsStartUpAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response(request.user.info.isStartup)
