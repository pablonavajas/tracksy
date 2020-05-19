# Generated by Django 2.2.10 on 2020-05-01 10:00

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('startups', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='startup',
            name='users',
            field=models.ManyToManyField(blank=True, related_name='startups', to=settings.AUTH_USER_MODEL),
        ),
    ]
