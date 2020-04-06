from django.db import models
from django.contrib.auth.models import User
<<<<<<< HEAD
# from django.contrib.postgres.fields import ArrayField
=======
from accounts.models import Connection
>>>>>>> master

# Create your models here.


class Startup(models.Model):
    users = models.ManyToManyField(
        User, related_name="startups", blank=True, null=True)
    startupEmail = models.EmailField()

    name = models.CharField(max_length=100)
    website = models.CharField(max_length=100, blank=True, null=True)
    ownership = models.FloatField(blank=True, null=True)
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
    comment = models.TextField(blank=True, null=True)
    currency = models.CharField(max_length=1)
    revenue = models.FloatField()
    cashBalance = models.FloatField()
    monthlyBurn = models.FloatField()
    startDate = models.DateField()
    endDate = models.DateField()

    class Meta:
        ordering = ['-startDate']


class Kpi(models.Model):
    financialId = models.ForeignKey(
        Financial, related_name='kpis', on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=20, blank=True, null=True)
    value = models.FloatField(blank=True, null=True)


class Job(models.Model):
    startupId = models.ForeignKey(
        Startup, related_name="jobs", on_delete=models.CASCADE)
    url = models.URLField(null=True, blank=True)
    title = models.TextField()
    description = models.TextField(null=True, blank=True)
    salary = models.CharField(max_length=200, null=True, blank=True)
    location = models.CharField(max_length=100, null=True, blank=True)
    importance = models.CharField(max_length=50, null=True, blank=True)

<<<<<<< HEAD
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
=======

class Introduction(models.Model):
    connection = models.ForeignKey(
        Connection, related_name="introductions", on_delete=models.CASCADE, null=True, blank=True)
    job = models.ForeignKey(Job, related_name="introductions",
                            on_delete=models.CASCADE, null=True, blank=True)
    status = models.CharField(max_length=200, null=True, blank=True)
>>>>>>> master
