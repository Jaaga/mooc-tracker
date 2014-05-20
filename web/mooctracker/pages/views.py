from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render_to_response

# index page
def index(request):
  # for the time being, redirecting to dashboard
  return render_to_response('pages/index.html')

def dashboard(request):

  return render_to_response('pages/dashboard.html')