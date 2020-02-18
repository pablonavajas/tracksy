from django.db import models

# Create your models here.

# This is are auto-generated Django models module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.

class FinancialData(models.Model):
    transaction_id = models.IntegerField(primary_key=True)
    startup = models.ForeignKey('Startups', on_delete=models.CASCADE)
    type = models.CharField(max_length=10)
    value = models.IntegerField(blank=True, null=True)
    date = models.DateTimeField()
    

    class Meta:
        managed = False
        db_table = 'financial_data'


class Requests(models.Model):
    request_id = models.IntegerField(primary_key=True)
    startup = models.ForeignKey('Startups', on_delete=models.CASCADE)
    type = models.CharField(max_length=10)
    description = models.TextField(blank=True, null=True)
    comment = models.TextField(blank=True, null=True)
    url = models.CharField(max_length=100, blank=True, null=True)
    contact = models.NullBooleanField()

    class Meta:
        managed = False
        db_table = 'requests'


class Startups(models.Model):
    startup_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=10)
    logo_url = models.CharField(max_length=100, blank=True, null=True)
    currency = models.CharField(max_length=10, blank=True, null=True)
    ownership = models.IntegerField(blank=True, null=True)
    board = models.CharField(max_length=30, blank=True, null=True)
    first_investment = models.IntegerField(blank=True, null=True)
    second_investment = models.IntegerField(blank=True, null=True)
    type_1 = models.CharField(max_length=30, blank=True, null=True)
    type_2 = models.CharField(max_length=30, blank=True, null=True)
    date_closed_1 = models.DateTimeField()
    date_closed_2 = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'startups'
        
    def __str__(self):
        return self.name


class TeamMembers(models.Model):
    startup = models.ForeignKey(Startups, on_delete=models.CASCADE)
    name = models.CharField(primary_key=True, max_length=50)
    title = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'team_members'


class Users(models.Model):
    user_id = models.IntegerField(primary_key=True)
    username = models.CharField(unique=True, max_length=50)
    password = models.CharField(max_length=50)
    email = models.CharField(unique=True, max_length=355)
    created_on = models.DateTimeField()
    last_login = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'users'


class Vcs(models.Model):
    vc_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=30)
    logo_url = models.CharField(max_length=30, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'vcs'


class VcsStartups(models.Model):
    startup = models.OneToOneField(Startups, on_delete=models.CASCADE, primary_key=True)
    vc = models.ForeignKey(Vcs, on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'vcs_startups'
        unique_together = (('startup', 'vc'),)


class VcsUsers(models.Model):
    user = models.OneToOneField(Users, on_delete=models.CASCADE, primary_key=True)
    vc = models.ForeignKey(Vcs, on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'vcs_users'
        unique_together = (('user', 'vc'),)



##################################
#   SAMPLE ON CREATING TABLES    #
##################################
 
#class TracksyModel(models.Model):
#    col = models.CharField(max_length = 20)
