from django.db import models

class Project(models.Model):
  project_name = models.CharField(max_length = 200)
  url = models.URLField(default=None, blank=True, null = True, max_length=400)
  project_description = models.TextField(default=None, blank=True, null = True, max_length=2000)
  project_site_url = models.URLField(default=None, blank=True, null = True, max_length=400)
  repository_url = models.URLField(default=None, blank=True, null = True, max_length=400)

  def __unicode__(self):
    return self.project_name