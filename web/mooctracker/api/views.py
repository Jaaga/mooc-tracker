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
  
  # GET Method
  
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
    content_type = 'application/json')

  # POST Method  

  elif request.method == 'POST':
    requestJson = json.loads(request.body)
    studentName = requestJson['name']
    newStudent = Student(name = studentName)
    newStudent.save()
    addedStudent = {'id' : newStudent.id, 'name' : newStudent.name}

    
    return HttpResponse(
      json.dumps(addedStudent),
      content_type = 'application/json')
 
  # UPDATE Method

  elif request.method == 'PUT':
  	requestJson = json.loads(request.body)
  	studentId = requestJson['id']
  	studentName = requestJson['name']
  	updateStudent = Student(id = studentId, name = studentName )
  	updateStudent.save()
  	addedStudent = {'id' : updateStudent.id, 'name' : updateStudent.name}

  	return HttpResponse(
  		json.dumps(addedStudent),
		content_type = 'application/json')

  
  # DELETE Method
  
  elif request.method == 'DELETE':
    requestJson = json.loads(request.body)
    studentId = requestJson['id']
    Student.objects.get(id = studentId).delete()
    message={ 'success' : 'True', 'id': studentId}

    return HttpResponse(
      json.dumps(message),
      content_type = 'application/json')

    
