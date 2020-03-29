from rest_framework import routers
from .api import *


router = routers.DefaultRouter()
router.register('api/startups', StartupViewSet, 'startups')
router.register('api/investments', InvestmentViewSet, 'investments')
urlpatterns = router.urls  # gives the list of urls registered at the route above
