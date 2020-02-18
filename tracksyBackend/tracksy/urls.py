from django.urls import include, path
from rest_framework import routers
from . import views

Startupsrouter = routers.DefaultRouter()
Startupsrouter.register(r'Startups', views.StartupsViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

urlpatterns = [
    #path('', views.index, name='index'),
    path('', include(Startupsrouter.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
