from rest_framework import serializers

from .models import Startups, Users

class StartupsSerializers(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Startups
        fields = ('startup_id', 'name', 'logo_url', 'currency', 'ownership', 'board', 'first_investment', 'second_investment', 'type_1', 'type_2', 'date_closed_1', 'date_closed_2')
    
class UsersSerializers(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Users
        fields = ('user_id', 'username','password', 'email', 'created_on', 'last_login')
