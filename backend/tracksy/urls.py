from django.urls import include, path
from rest_framework import routers
from . import views

Startupsrouter = routers.DefaultRouter()
Startupsrouter.register(r'startups', views.StartupsViewSet)

#Usersrouter = routers.DefaultRouter()
#Startupsrouter.register(r'users', views.UsersViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

urlpatterns = [
    #path('', views.index, name='index'),
    path('', include(Startupsrouter.urls)),
    #path('', include(Usersrouter.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
