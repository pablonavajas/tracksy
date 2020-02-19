from rest_framework import serializers

from .models import Startups

class StartupsSerializers(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Startups
        fields = ('startup_id', 'name', 'logo_url', 'currency', 'ownership', 'board', 'first_investment', 'second_investment', 'type_1', 'type_2', 'date_closed_1', 'date_closed_2')
    
