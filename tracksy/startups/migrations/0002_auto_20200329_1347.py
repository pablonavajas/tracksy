# Generated by Django 3.0.4 on 2020-03-29 13:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('startups', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='investment',
            old_name='startup_id',
            new_name='startupId',
        ),
        migrations.RemoveField(
            model_name='kpiname',
            name='startup_id',
        ),
        migrations.AddField(
            model_name='kpiname',
            name='startupId',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='kpinames', to='startups.Startup'),
        ),
    ]
