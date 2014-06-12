from django.http import HttpResponse
from django.core.context_processors import csrf
import json

from rest_framework import viewsets, permissions, renderers
from .serializers import StudentSerializer
from students.models import Student

class StudentViewSet(viewsets.ReadOnlyModelViewSet):
  """
  This viewset automatically provides 'list' and 'detail' actions.
  """
  queryset = Student.objects.all()
  serializer_class = StudentSerializer
