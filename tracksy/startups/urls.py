from rest_framework import routers
from django.urls import path
from .api import *

router = routers.DefaultRouter()
router.register('api/startups', StartupViewSet, 'startups')
router.register('api/kpis', KpiViewSet, 'kpis')
router.register('api/financials', FinancialViewSet, 'financials')
urlpatterns = router.urls  # gives the list of urls registered at the route above

urlpatterns.append(path('api/investments', InvestmentAPI.as_view()))
urlpatterns.append(path('api/info', InfoView.as_view()))
urlpatterns.append(path('api/kpiNames', KpiNameAPI.as_view()))