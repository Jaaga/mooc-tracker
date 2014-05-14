from django.conf.urls import patterns
from .views import *

urlpatterns = patterns('',
    
  (r'^status/$', status),

  # students API
  (r'^students/$', students)

)