from django.db import models
from django.contrib.auth.models import User


class Info(models.Model):
    user = models.OneToOneField(User, related_name='info', on_delete=models.CASCADE)
    isStartup = models.BooleanField()


class Connection(models.Model):
    user = models.ForeignKey(User, related_name="connections", on_delete=models.CASCADE)
    owner = models.CharField(max_length=100)
    name = models.CharField(max_length=100, blank=True, null=True)
    url = models.URLField(blank=True, null=True)
    description = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        unique_together = ['user', 'url']