from django.shortcuts import render
from django.views.generic import TemplateView
from .models import Startup
# Create your views here.

class StartupChartView(TemplateView):
    template_name = 'startups/chart.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["qs"] = Startup.objects.all()
        return context
