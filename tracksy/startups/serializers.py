from rest_framework import serializers
from .models import *


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
        kpi_names_data = None
        investments_data = None

        if 'kpinames' in validated_data:
            kpi_names_data = validated_data.pop('kpinames')

        if 'investments' in validated_data:
            investments_data = validated_data.pop('investments')

        startup = Startup.objects.create(**validated_data)

        if kpi_names_data is not None:
            for kpi in kpi_names_data:
                KpiName.objects.create(startupId=startup, **kpi)

        if investments_data is not None:
            for investment in investments_data:
                Investment.objects.create(startupId=startup, **investment)

        return startup
