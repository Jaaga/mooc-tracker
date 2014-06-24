from django.db import models

from students.models import Student
from courses.models import Course

class Academic(models.Model):
  student = models.ForeignKey(Student)
  course = models.ForeignKey(Course)
  start_date = models.DateField(default=None, blank=True, null=True)
  end_date = models.DateField(default=None, blank=True, null = True)
  status = models.CharField(max_length=100, default='Interested') # Interested, Doing, Completed

class AcademicUpdate(models.Model):
  academic_instance = models.ForeignKey(Academic)
  update = models.TextField()
  update_time = models.DateTimeField(auto_now_add=True)
  