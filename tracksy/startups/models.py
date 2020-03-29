from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Startup(models.Model):
    owner = models.ForeignKey(
        User, related_name="portfolio", on_delete=models.CASCADE, null=True)
    ownerStartup = models.ForeignKey(
        User, related_name="startup", on_delete=models.CASCADE, blank=True, null=True)
    startupEmail = models.EmailField()
    name = models.CharField(max_length=20, unique=True)
    website = models.CharField(max_length=100, blank=True, unique=True)
    ownership = models.IntegerField(blank=True, null=True)
    board = models.CharField(max_length=30, blank=True, null=True)


class Investment(models.Model):
    startupId = models.ForeignKey(Startup,
                                  related_name='investments',
                                  on_delete=models.CASCADE)
    value = models.FloatField(blank=True)
    currency = models.CharField(max_length=1)
    date = models.DateField(blank=True, null=True)


class KpiName(models.Model):
    startupId = models.ForeignKey(
        Startup, related_name='kpinames', on_delete=models.CASCADE)
    name = models.CharField(max_length=20)
