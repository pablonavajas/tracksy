from rest_framework import routers
from django.urls import path
from .api import *

router = routers.DefaultRouter()
router.register('api/startups', StartupViewSet, 'startups')

urlpatterns = router.urls
urlpatterns += [
    path('api/investments/<int:startupId>/', InvestmentAPI.as_view(), name="investments"),
    path('api/investments/<int:startupId>/<int:pk>/', InvestmentAPI.as_view(), name="investment"),
    path('api/kpiNames/<int:startupId>/', KpiNameAPI.as_view(), name="kpiNames"),
    path('api/kpiNames/<int:startupId>/<int:pk>/', KpiNameAPI.as_view(), name="kpiName"),
    path('api/financials/<int:startupId>/', FinancialAPI.as_view(), name="financials"),
    path('api/financials/<int:startupId>/<int:pk>/', FinancialAPI.as_view(), name="financial"),
    path('api/jobDescription/', AngelJobAPI.as_view(), name="jobDescription"),
    path('api/job/<int:startupId>/', JobAPI.as_view(), name="jobs"),
    path('api/job/<int:startupId>/<int:pk>/', JobAPI.as_view(), name="job"),
    path('api/introduction/<int:startupId>/<int:jobId>/<int:pk>/', IntroductionAPI.as_view(), name="introductions")
]


