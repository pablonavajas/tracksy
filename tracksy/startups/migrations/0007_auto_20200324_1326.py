# Generated by Django 3.0.4 on 2020-03-24 13:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('startups', '0006_startup_owner'),
    ]

    operations = [
        migrations.AddField(
            model_name='startup',
            name='monthly_burn',
            field=models.IntegerField(blank=True, default=0),
        ),
        migrations.AddField(
            model_name='startup',
            name='runway',
            field=models.IntegerField(blank=True, default=0),
        ),
    ]
