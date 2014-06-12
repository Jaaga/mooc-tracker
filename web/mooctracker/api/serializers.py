from rest_framework import serializers
from students.models import Student

class StudentSerializer(serializers.HyperlinkedModelSerializer):

  class Meta:
    model = Student
    fields = ('id', 'name')