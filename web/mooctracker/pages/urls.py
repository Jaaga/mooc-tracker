from django.conf.urls import patterns
from .views import *

urlpatterns = patterns('',
    
  (r'^dashboard/$', dashboard),

  (r'^student-dashboard/$', student_dashboard),

)