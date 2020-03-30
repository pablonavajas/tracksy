from django.db import models
from django.contrib.auth.models import User


class Info(models.Model):
    user = models.OneToOneField(User, related_name='info', on_delete=models.CASCADE)
    isStartup = models.BooleanField()
