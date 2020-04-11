from rest_framework import serializers

from .models import Startups, Users

class StartupsSerializers(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Startups
        fields = ('startup_id', 'name', 'website', 'ownership', 'board', 'investment_1', 'investment_2', 'type_1', 'type_2', 'date_1', 'date_2')
    
class UsersSerializers(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Users
        fields = ('user_id', 'username','password', 'email', 'created_on', 'last_login')
