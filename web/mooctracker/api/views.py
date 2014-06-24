from django.http import HttpResponse
from django.core.context_processors import csrf
import json

from rest_framework import viewsets, permissions, renderers
from .serializers import StudentSerializer, CourseSerializer, ProjectSerializer, AcademicSerializer, UpdateSerializer
from students.models import Student
from courses.models import Course
from projects.models import Project
from academics.models import Academic, AcademicUpdate

class StudentViewSet(viewsets.ModelViewSet):
  """
  This viewset automatically provides 'list', 'create', 'retrieve', 'update' and 'destroy' actions. 
  """
  queryset = Student.objects.all()
  serializer_class = StudentSerializer

class CourseViewSet(viewsets.ModelViewSet):
  """
  This viewset automatically provides 'list', 'create', 'retrieve', 'update' and 'destroy' actions. 
  """
  queryset = Course.objects.all()
  serializer_class = CourseSerializer

class ProjectViewSet(viewsets.ModelViewSet):
  """
  This viewset automatically provides 'list', 'create', 'retrieve', 'update' and 'destroy' actions. 
  """
  queryset = Project.objects.all()
  serializer_class = ProjectSerializer

class AcademicViewSet(viewsets.ModelViewSet):
  """
  This viewset automatically provides 'list', 'create', 'retrieve', 'update' and 'destroy' actions. 
  """
  queryset = Academic.objects.all()
  serializer_class = AcademicSerializer

class UpdateViewSet(viewsets.ModelViewSet):
  """
  This viewset automatically provides 'list', 'create', 'retrieve', 'update' and 'destroy' actions. 
  """
  queryset = AcademicUpdate.objects.all()
  serializer_class = UpdateSerializer