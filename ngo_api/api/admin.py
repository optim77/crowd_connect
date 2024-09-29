from django.contrib import admin

from api.models import CategoryOrganization, CategoryProject, Company, Budget, Grant, Ngo, Project

admin.site.register(CategoryOrganization)
admin.site.register(CategoryProject)
admin.site.register(Company)
admin.site.register(Budget)
admin.site.register(Grant)
admin.site.register(Ngo)
admin.site.register(Project)
