from django.db import models

class Course(models.Model):
  course_title = models.CharField(max_length = 200)
  url = models.URLField(max_length=400)

  def __unicode__(self):
    return self.course_title