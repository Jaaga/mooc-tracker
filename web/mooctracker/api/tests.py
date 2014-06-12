from django.test import TestCase

from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from students.models import Student
from .serializers import StudentSerializer

class ReadStudentTest(APITestCase):
  def setUp(self):
    self.student = Student.objects.create(name='ansal')

  def test_can_read_student_list(self):
    response = self.client.get(reverse('student-list'))
    self.assertEqual(response.status_code, status.HTTP_200_OK)

  def test_can_read_student_detail(self):
    response = self.client.get(reverse('student-detail', args=[self.student.id]))
    self.assertEqual(response.status_code, status.HTTP_200_OK)
