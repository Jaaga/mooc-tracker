from django.db import models

class Course(models.Model):
  course_title = models.CharField(max_length = 200)
  url = models.URLField(max_length=400)
