"""
        TODO: sort out emailing of password (printed atm)
"""

from rest_framework import serializers
from .models import *
from accounts.models import Info
from django.contrib.auth.models import User


class InvestmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Investment
        fields = '__all__'  # (value, currency, etc.)


class KpiNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = KpiName
        fields = '__all__'


class KpiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kpi
        fields = ['id', 'name', 'value', 'financialId']


class FinancialSerializer(serializers.ModelSerializer):
    kpis = KpiSerializer(many=True, required=False)

    class Meta:
        model = Financial
        fields = '__all__'

    def create(self, validated_data):
        kpisData = None
        if 'kpis' in validated_data:
            kpisData = validated_data.pop('kpis')

        financials = Financial.objects.create(**validated_data)

        if kpisData is not None:
            for kpiData in kpisData:
                Kpi.objects.create(financialId=financials, **kpiData)

        return financials

    def update_all(self, obj, data):
        for (key, value) in data.items():
            setattr(obj, key, value)
        return obj

    def update(self, instance, validated_data):
        kpisData = None
        if 'kpis' in validated_data:
            kpisData = validated_data.pop('kpis')

        instance = self.update_all(instance, validated_data)
        instance.save()

        instance.kpis.all().delete()
        if kpisData is not None:
            for kpiData in kpisData:
                Kpi.objects.create(**kpiData)

        return instance


class StartupSerializer(serializers.ModelSerializer):
    """ For Adding a Startup (KPI and Investments can be nested in)

    Note:
        Updating has to be done through other apis, because update 
        function is not defined for editing nested functionality.
    """
    kpinames = KpiNameSerializer(many=True, read_only=True)
    investments = InvestmentSerializer(many=True, read_only=True)
    financials = FinancialSerializer(many=True, read_only=True)

    class Meta:
        model = Startup
        fields = '__all__'  # (name, website, etc.)

    def create(self, validated_data):
        vc_user = validated_data.pop('users')
        email = validated_data.get('startupEmail')
        username = email[:email.find("@")]
        password = User.objects.make_random_password()
        print(password)

        startup_user = User.objects.create_user(
            username,
            email,
            password)
        Info.objects.create(user=startup_user, isStartup=True)

        startup = Startup.objects.create(**validated_data)
        startup.users.add(startup_user)
        startup.users.add(vc_user)

        return startup
