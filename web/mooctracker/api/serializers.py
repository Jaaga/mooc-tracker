from rest_framework import serializers
from students.models import Student
from courses.models import Course
from projects.models import Project
from academics.models import Academic, AcademicUpdate

class StudentSerializer(serializers.HyperlinkedModelSerializer):

  class Meta:
    model = Student
    fields = ('id', 'name', 'email')

class CourseSerializer(serializers.HyperlinkedModelSerializer):

  class Meta:
    model = Course
    fields = ('id', 'course_title', 'url')

class ProjectSerializer(serializers.HyperlinkedModelSerializer):

  class Meta:
    model = Project
    fields = ('id', 'project_name', 'url')

class AcademicSerializer(serializers.HyperlinkedModelSerializer):

  class Meta:
    model = Academic
    fields = ('id', 'student', 'course')

class UpdateSerializer(serializers.HyperlinkedModelSerializer):

  class Meta:
    model = AcademicUpdate
    fields = ('id', 'academic_instance', 'update', 'update_time')