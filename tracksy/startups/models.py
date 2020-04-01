from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Startup(models.Model):
    users = models.ManyToManyField(User, related_name="startups", blank=True, null=True)
    startupEmail = models.EmailField()

    name = models.CharField(max_length=100)
    website = models.CharField(max_length=100, blank=True, null=True)
    ownership = models.IntegerField(blank=True, null=True)
    board = models.CharField(max_length=30, blank=True, null=True)

    def __str__(self):
        return self.name


class Investment(models.Model):
    startupId = models.ForeignKey(Startup,
                                  related_name='investments',
                                  on_delete=models.CASCADE)
    value = models.FloatField(blank=True)
    currency = models.CharField(max_length=1)
    investmentType = models.CharField(max_length=20, blank=True, null=True)
    date = models.DateField(blank=True, null=True)

    class Meta:
        ordering = ['date']


class KpiName(models.Model):
    startupId = models.ForeignKey(
        Startup, related_name='kpinames', on_delete=models.CASCADE)
    name = models.CharField(max_length=20)


class Financial(models.Model):
    startupId = models.ForeignKey(
        Startup, related_name='financials', on_delete=models.CASCADE)
    comment = models.CharField(max_length=1000, blank=True, null=True)
    currency = models.CharField(max_length=1)
    revenue = models.FloatField(blank=True, null=True)
    cashBalance = models.FloatField(blank=True, null=True)
    monthlyBurn = models.FloatField(blank=True, null=True)
    startDate = models.DateField(blank=True, null=True)
    endDate = models.DateField(blank=True, null=True)

    class Meta:
        ordering = ['-startDate']


class Kpi(models.Model):
    financialId = models.ForeignKey(
        Financial, related_name='kpis', on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=20, blank=True, null=True)
