from django.db import models

# Create your models here.


class Startup(models.Model):
    name = models.CharField(max_length=20, unique=True)
    website = models.CharField(max_length=100, blank=True, unique=True)
    currency = models.CharField(max_length=10, blank=True, null=True)
    ownership = models.IntegerField(blank=True, null=True)
    board = models.CharField(max_length=30, blank=True, null=True)

    # First Round of Investment, it's type and date closed
    investment_1 = models.IntegerField(blank=True, null=True)
    type_1 = models.CharField(max_length=30, blank=True, null=True)
    date_closed_1 = models.DateTimeField(auto_now_add=True)

    # First Round of Investment, it's type and date closed
    investment_2 = models.IntegerField(blank=True, null=True)
    type_2 = models.CharField(max_length=30, blank=True, null=True)
    date_closed_2 = models.DateTimeField(auto_now_add=True)
