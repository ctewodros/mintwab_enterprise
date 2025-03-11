from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Organization
from .serializers import OrganizationSerializer

# Create your views here.
class OrganizationViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing organization information.
    Provides CRUD operations for the Organization model.
    """
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        """
        This view should return the organization information.
        For now, we're returning all organizations, but in a real-world scenario,
        we might want to filter based on the user's permissions.
        """
        return Organization.objects.all()
