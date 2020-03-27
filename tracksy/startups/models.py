from django.db import models
from django.contrib.auth.models import User
# from django.contrib.postgres.fields import ArrayField

# Create your models here.


class Startup(models.Model):
    name = models.CharField(max_length=20, unique=True)
    website = models.CharField(max_length=100, blank=True, unique=True)
    currency = models.CharField(max_length=10, blank=True, null=True)
    ownership = models.IntegerField(blank=True, null=True)
    board = models.CharField(max_length=30, blank=True, null=True)

    # Investment amounts in round 1 and 2
    investment_1 = models.IntegerField(blank=True, default=0)
    investment_2 = models.IntegerField(blank=True, default=0)

    # Type of investment in round 1 and 2
    type_1 = models.CharField(max_length=30, blank=True, null=True)
    type_2 = models.CharField(max_length=30, blank=True, null=True)

    # Date investments in round 1 and 2 were closed
    date_closed_1 = models.DateField(blank=True)
    date_closed_2 = models.DateField(blank=True)
    
    owner = models.ForeignKey(
        User, related_name="startups", on_delete=models.CASCADE, null=True)
    
    # Overview Stats
    cash_balance = models.IntegerField(blank=True, default=0)
    monthly_burn = models.IntegerField(blank=True, default=0)

    # KPIs
    # kpi_string = ArrayField(models.CharField(max_length=10, blank=True, null=True), default=list)
    # kpi_value = ArrayField(ArrayField(models.IntegerField(blank=True), default=list)

    #chart
    name_1 = models.CharField(max_length=20, unique=True, null=True)
    money = models.IntegerField(blank=True, default=0)

    def __str__(self):
        return "{}-{}".format(self.name_1, self.money)