from django.test import TestCase

from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from students.models import Student
from courses.models import Course
from .serializers import StudentSerializer, CourseSerializer

# Tests for Student Model

class ReadStudentTest(APITestCase):
  def setUp(self):
    self.student = Student.objects.create(name='ansal')

  def test_can_read_student_list(self):
    response = self.client.get(reverse('student-list'))
    self.assertEqual(response.status_code, status.HTTP_200_OK)

  def test_can_read_student_detail(self):
    response = self.client.get(reverse('student-detail', args=[self.student.id]))
    self.assertEqual(response.status_code, status.HTTP_200_OK)

# Tests for Course Model

class CreateCourseTest(APITestCase):
  def setUp(self):
    self.course = Course.objects.create(course_title="Intro to Computer Science Build a Search Engine & a Social Network", url="https://www.udacity.com/course/cs101")
    self.data = {'course_title': 'Intro to Computer Science Build a Search Engine & a Social Network', 'url': 'https://www.udacity.com/course/cs101'}

  def test_can_create_course(self):
    response = self.client.post(reverse('course-list'), self.data)
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class ReadCourseTest(APITestCase):
  def setUp(self):
    self.course = Course.objects.create(course_title="Intro to Computer Science Build a Search Engine & a Social Network", url="https://www.udacity.com/course/cs101")

  def test_can_read_course_list(self):
    response = self.client.get(reverse('course-list'))
    self.assertEqual(response.status_code, status.HTTP_200_OK)

  def test_can_read_course_detail(self):
    response = self.client.get(reverse('course-detail', args=[self.course.id]))
    self.assertEqual(response.status_code, status.HTTP_200_OK)


class UpdateCourseTest(APITestCase):
  def setUp(self):
    self.course = Course.objects.create(course_title="Intro to Computer Science Build a Search Engine & a Social Network", url="https://www.udacity.com/course/cs101")
    self.updated_course = Course.objects.create(course_title="Intro to Computer Science", url="https://www.udacity.com/course/cs101")
    self.data = CourseSerializer(self.updated_course).data
  
  def test_can_update_course(self):
    response = self.client.put(reverse('course-detail', args=[self.course.id]), self.data)
    self.assertEqual(response.status_code, status.HTTP_200_OK)


class DeleteCourseTest(APITestCase):
  def setUp(self):
    self.course = Course.objects.create(course_title="Intro to Computer Science Build a Search Engine & a Social Network", url="https://www.udacity.com/course/cs101")    
  
  def test_can_update_course(self):
    response = self.client.delete(reverse('course-detail', args=[self.course.id]))
    self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
