import random
from rest_framework import viewsets
from rest_framework.decorators import action

from .models import CategoryOrganization, CategoryProject, Company, Budget, Grant, Ngo, Project
from .serializers import (CategoryOrganizationSerializer, CategoryProjectSerializer,
                          CompanySerializer, BudgetSerializer, GrantSerializer,
                          NgoSerializer, ProjectSerializer)
from rest_framework.views import APIView
from rest_framework.response import Response

class CategoryOrganizationViewSet(viewsets.ModelViewSet):
    queryset = CategoryOrganization.objects.all()
    serializer_class = CategoryOrganizationSerializer
    lookup_field = 'id'

class CategoryProjectViewSet(viewsets.ModelViewSet):
    queryset = CategoryProject.objects.all()
    serializer_class = CategoryProjectSerializer
    lookup_field = 'id'

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    lookup_field = 'id'

class BudgetViewSet(viewsets.ModelViewSet):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer
    lookup_field = 'id'

class GrantViewSet(viewsets.ModelViewSet):
    queryset = Grant.objects.all()
    serializer_class = GrantSerializer
    lookup_field = 'id'

class NgoViewSet(viewsets.ModelViewSet):
    queryset = Ngo.objects.all()
    serializer_class = NgoSerializer
    lookup_field = 'id'

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = 'id'

    @action(detail=False, methods=['get'], url_path='by-category/(?P<category_id>[^/.]+)')
    def get_projects_by_category(self, request, category_id=None):
        projects = self.queryset.filter(category=category_id)
        serializer = self.serializer_class(projects, many=True)
        return Response(serializer.data)


from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Project
from .serializers import ProjectSerializer


class LatestProjectsView(APIView):
    def get(self, request, *args, **kwargs):
        latest_projects = Project.objects.order_by('-id')[:5]
        serializer = ProjectSerializer(latest_projects, many=True)
        return Response(serializer.data)
