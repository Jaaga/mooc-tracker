from django.conf.urls import patterns
from .views import *

urlpatterns = patterns('',
    
  (r'^status/$', status),

  # students API
  (r'^students/$', students),
  # backbone sends id for delete as a pretty URL
  (r'^students/(?P<pk>\w+)$', students)

)