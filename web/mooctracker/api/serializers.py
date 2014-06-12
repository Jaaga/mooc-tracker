from rest_framework import serializers
from students.models import Student
from courses.models import Course
from projects.models import Project

class StudentSerializer(serializers.HyperlinkedModelSerializer):

  class Meta:
    model = Student
    fields = ('id', 'name')

class CourseSerializer(serializers.HyperlinkedModelSerializer):

  class Meta:
    model = Course
    fields = ('id', 'course_title', 'url')

class ProjectSerializer(serializers.HyperlinkedModelSerializer):

  class Meta:
    model = Project
    fields = ('id', 'project_name', 'url')