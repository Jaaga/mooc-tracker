from django.test import TestCase

from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from students.models import Student
from courses.models import Course
from projects.models import Project
from .serializers import StudentSerializer, CourseSerializer, ProjectSerializer

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

# Tests for Project Model

class CreateProjectTest(APITestCase):
  def setUp(self):
    self.project = Project.objects.create(project_name="Django Poll App ( Django version 1.6)", url="https://docs.djangoproject.com/en/1.6/intro/tutorial01/")
    self.data = {'project_name': 'Django Poll App ( Django version 1.6)', 'url': 'https://docs.djangoproject.com/en/1.6/intro/tutorial01/'}

  def test_can_create_project(self):
    response = self.client.post(reverse('project-list'), self.data)
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class ReadProjectTest(APITestCase):
  def setUp(self):
    self.project = Project.objects.create(project_name="Django Poll App ( Django version 1.6)", url="https://docs.djangoproject.com/en/1.6/intro/tutorial01/")

  def test_can_read_project_list(self):
    response = self.client.get(reverse('project-list'))
    self.assertEqual(response.status_code, status.HTTP_200_OK)

  def test_can_read_project_detail(self):
    response = self.client.get(reverse('project-detail', args=[self.project.id]))
    self.assertEqual(response.status_code, status.HTTP_200_OK)


class UpdateProjectTest(APITestCase):
  def setUp(self):
    self.project = Project.objects.create(project_name="Django Poll App ( Django version 1.6)", url="https://docs.djangoproject.com/en/1.6/intro/tutorial01/")
    self.updated_project = Project.objects.create(project_name="Django Poll App", url="https://docs.djangoproject.com/en/1.6/intro/tutorial01/")
    self.data = ProjectSerializer(self.updated_project).data
  
  def test_can_update_project(self):
    response = self.client.put(reverse('project-detail', args=[self.project.id]), self.data)
    self.assertEqual(response.status_code, status.HTTP_200_OK)


class DeleteProjectTest(APITestCase):
  def setUp(self):
    self.project = Project.objects.create(project_name="Django Poll App ( Django version 1.6)", url="https://docs.djangoproject.com/en/1.6/intro/tutorial01/")
  
  def test_can_update_project(self):
    response = self.client.delete(reverse('project-detail', args=[self.project.id]))
    self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
