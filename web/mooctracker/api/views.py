from django.http import HttpResponse
from django.core.context_processors import csrf
import json

from students.models import Student

STATUS_OK = {
  'success' : 'API is running'
}

# status view
def status(request):  

  return HttpResponse(
    json.dumps(STATUS_OK),
    content_type = 'application/json'
  )

# students api implementing GET, POST, PUT & DELETE for Student model
def students(request):

  if request.method == 'GET':

    response = []
    students = Student.objects.all()
    for student in students:
      obj = {}
      obj.update({ 'id': student.id })
      obj.update({ 'name': student.name })
      response.append(obj)

    return HttpResponse(
      json.dumps(response),
      content_type = 'application/json'
    )