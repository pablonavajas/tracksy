from rest_framework import routers
from django.urls import path
from .api import *

router = routers.DefaultRouter()
router.register('api/startups', StartupViewSet, 'startups')
urlpatterns = router.urls  # gives the list of urls registered at the route above

urlpatterns.append(path('api/investments/<int:startupId>/', InvestmentAPI.as_view()))
urlpatterns.append(path('api/investments/<int:startupId>/<int:pk>/', InvestmentAPI.as_view()))
urlpatterns.append(path('api/kpiNames/<int:startupId>/', KpiNameAPI.as_view()))
urlpatterns.append(path('api/kpiNames/<int:startupId>/<int:pk>/', KpiNameAPI.as_view()))
urlpatterns.append(path('api/financials/<int:startupId>/', FinancialAPI.as_view()))
urlpatterns.append(path('api/financials/<int:startupId>/<int:pk>/', FinancialAPI.as_view()))
urlpatterns.append(path('api/jobDescription/', AngelJobAPI.as_view()))
urlpatterns.append(path('api/job/<int:startupId>/', JobAPI.as_view()))
urlpatterns.append(path('api/introduction/<int:startupId>/', IntroductionAPI.as_view()))
