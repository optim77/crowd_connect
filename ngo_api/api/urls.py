from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CategoryOrganizationViewSet, CategoryProjectViewSet, CompanyViewSet,
    BudgetViewSet, GrantViewSet, NgoViewSet, ProjectViewSet, LatestProjectsView
)

router = DefaultRouter()
router.register(r'category-organizations', CategoryOrganizationViewSet)
router.register(r'category-projects', CategoryProjectViewSet)
router.register(r'companies', CompanyViewSet)
router.register(r'budgets', BudgetViewSet)
router.register(r'grants', GrantViewSet)
router.register(r'ngos', NgoViewSet)
router.register(r'projects', ProjectViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('latest-projects/', LatestProjectsView.as_view(), name='latest-projects'),
]
