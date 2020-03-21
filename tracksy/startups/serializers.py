from rest_framework import serializers

from startups.models import Startup

# Lead Serializer


class StartupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Startup
        fields = '__all__'  # (name, website, etc.)
