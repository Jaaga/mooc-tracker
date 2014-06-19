from django.db import models

class Student(models.Model):
  name = models.CharField(max_length = 200)
  email = models.EmailField(max_length = 75)

  def __unicode__(self):
    return self.name