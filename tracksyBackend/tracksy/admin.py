from django.contrib import admin

# Register your models here.

from .models import Startups, Vcs, VcsStartups, VcsUsers, Users, FinancialData, TeamMembers, Requests
admin.site.register(Startups)
admin.site.register(Vcs)
admin.site.register(VcsStartups)
admin.site.register(VcsUsers)
admin.site.register(Users)
admin.site.register(FinancialData)
admin.site.register(TeamMembers)
admin.site.register(Requests)
