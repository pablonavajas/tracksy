from rest_framework import routers
from .api import *


router = routers.DefaultRouter()
router.register('api/startups', StartupViewSet, 'startups')
router.register('api/investments', InvestmentViewSet, 'investments')
router.register('api/kpiNames', KpiNameViewSet, 'kpiNames')
router.register('api/kpis', KpiViewSet, 'kpis')
router.register('api/financials', FinancialViewSet, 'financials')
urlpatterns = router.urls  # gives the list of urls registered at the route above
