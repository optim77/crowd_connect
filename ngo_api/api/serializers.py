from rest_framework import serializers
from .models import CategoryOrganization, CategoryProject, Company, Budget, Grant, Ngo, Project

class CategoryOrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryOrganization
        fields = '__all__'

class CategoryProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryProject
        fields = '__all__'

class NgoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ngo
        fields = '__all__'

class CompanySerializer(serializers.ModelSerializer):
    partnership = NgoSerializer(many=True, read_only=True)
    class Meta:
        model = Company
        fields = '__all__'

class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = '__all__'

class GrantSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)
    class Meta:
        model = Grant
        fields = '__all__'



class ProjectSerializer(serializers.ModelSerializer):
    ngo = NgoSerializer(many=True, read_only=True)
    class Meta:
        model = Project
        fields = '__all__'
