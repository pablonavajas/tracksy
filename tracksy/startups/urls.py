from rest_framework import routers
from django.urls import path
from .api import *

router = routers.DefaultRouter()
router.register('api/startups', StartupViewSet, 'startups')
urlpatterns = router.urls  # gives the list of urls registered at the route above

urlpatterns.append(path('api/investments/', InvestmentAPI.as_view()))
urlpatterns.append(path('api/investments/<int:startupId>/<int:pk>/', InvestmentAPI.as_view()))
urlpatterns.append(path('api/kpiNames/', KpiNameAPI.as_view()))
urlpatterns.append(path('api/kpiNames/<int:startupId>/<int:pk>/', KpiNameAPI.as_view()))
urlpatterns.append(path('api/financials/', FinancialAPI.as_view()))
urlpatterns.append(path('api/financials/<int:startupId>/<int:pk>/', FinancialAPI.as_view()))

urlpatterns.append(path('api/info/', InfoAPI.as_view()))
