from django.conf.urls import patterns, url, include
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'students', StudentViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'academics', AcademicViewSet)

urlpatterns = patterns('',
  url(r'^', include(router.urls)),
  url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
)
