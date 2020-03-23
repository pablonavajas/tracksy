from rest_framework import routers
from .api import StartupViewSet


router = routers.DefaultRouter()
router.register('api/startups', StartupViewSet, 'startups')
urlpatterns = router.urls  # gives the list of urls registered at the route above
