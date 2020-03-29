"""
    Note:
        Adding the same startup for two (or more) different VC
        funds is not a feature built here (to be resolved later)
"""

from rest_framework import serializers
from .models import *
from accounts.serializers import RegisterSerializer
from django.contrib.auth.models import User


class InvestmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Investment
        fields = '__all__'  # (value, currency, etc.)


class KpiNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = KpiName
        fields = '__all__'


class StartupSerializer(serializers.ModelSerializer):
    """ For Adding a Startup (KPI and Investments can be nested in)

    Note:
        Updating has to be done through other apis, because update 
        function is not defined for editing nested functionality.
    """
    kpinames = KpiNameSerializer(many=True, required=False)
    investments = InvestmentSerializer(many=True, required=False)

    class Meta:
        model = Startup
        fields = '__all__'  # (name, website, etc.)

    def create(self, validated_data):
        email = validated_data.get('startupEmail')
        username = email[:email.find("@")]
        password = User.objects.make_random_password()
        print(password)

        user = User.objects.create_user(
            username,
            email,
            password)

        validated_data['ownerStartup'] = user

        Startup.objects.create(**validated_data)

        return validated_data
