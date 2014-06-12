from django.http import HttpResponse
from django.core.context_processors import csrf
import json

from rest_framework import viewsets, permissions, renderers
from .serializers import StudentSerializer, CourseSerializer
from students.models import Student
from courses.models import Course

class StudentViewSet(viewsets.ReadOnlyModelViewSet):
  """
  This viewset automatically provides 'list' and 'detail' actions.
  """
  queryset = Student.objects.all()
  serializer_class = StudentSerializer

class CourseViewSet(viewsets.ModelViewSet):
  """
  This viewset automatically provides 'list', 'create', 'retrieve', 'update' and 'destroy' actions. 
  """
  queryset = Course.objects.all()
  serializer_class = CourseSerializer
