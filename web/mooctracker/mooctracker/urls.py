from django.conf.urls import patterns, include, url
from django.contrib import admin
admin.autodiscover()

from pages.views import index

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'mooctracker.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),

    # app specific urls
    
    # APIs
    (r'^api/',include('api.urls')),

    #pages
    (r'^pages/',include('pages.urls')),

    # index
    (r'^$', index)
)
