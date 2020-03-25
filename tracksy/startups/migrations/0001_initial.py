# Generated by Django 3.0.4 on 2020-03-25 00:02

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Startup',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20, unique=True)),
                ('website', models.CharField(blank=True, max_length=100, unique=True)),
                ('currency', models.CharField(blank=True, max_length=10, null=True)),
                ('ownership', models.IntegerField(blank=True, null=True)),
                ('board', models.CharField(blank=True, max_length=30, null=True)),
                ('investment_1', models.IntegerField(blank=True, default=0)),
                ('investment_2', models.IntegerField(blank=True, default=0)),
                ('type_1', models.CharField(blank=True, max_length=30, null=True)),
                ('type_2', models.CharField(blank=True, max_length=30, null=True)),
                ('date_closed_1', models.DateField(blank=True)),
                ('date_closed_2', models.DateField(blank=True)),
                ('cash_balance', models.IntegerField(blank=True, default=0)),
                ('monthly_burn', models.IntegerField(blank=True, default=0)),
                ('owner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='startups', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
