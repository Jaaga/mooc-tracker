from django.test import TestCase

from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from students.models import Student
from courses.models import Course
from projects.models import Project
from academics.models import Academic
from .serializers import StudentSerializer, CourseSerializer, ProjectSerializer, AcademicSerializer

# Tests for Student Model

class CreateStudentTest(APITestCase):
  def setUp(self):
    self.student = Student.objects.create(name='ansal')
    self.data = {'name': 'ansal'}

  def test_can_create_student(self):
    response = self.client.post(reverse('student-list'), self.data)
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class ReadStudentTest(APITestCase):
  def setUp(self):
    self.student = Student.objects.create(name='ansal')

  def test_can_read_student_list(self):
    response = self.client.get(reverse('student-list'))
    self.assertEqual(response.status_code, status.HTTP_200_OK)

  def test_can_read_student_detail(self):
    response = self.client.get(reverse('student-detail', args=[self.student.id]))
    self.assertEqual(response.status_code, status.HTTP_200_OK)

class UpdateStudentTest(APITestCase):
  def setUp(self):
    self.student = Student.objects.create(name='ansal')
    self.updated_student = Student.objects.create(name='rajeef')
    self.data = StudentSerializer(self.updated_student).data
  
  def test_can_update_course(self):
    response = self.client.put(reverse('student-detail', args=[self.student.id]), self.data)
    self.assertEqual(response.status_code, status.HTTP_200_OK)

class DeleteStudentTest(APITestCase):
  def setUp(self):
    self.student = Student.objects.create(name='ansal')
  
  def test_can_update_student(self):
    response = self.client.delete(reverse('student-detail', args=[self.student.id]))
    self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

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

# Tests for Academics Model

class CreateAcademicTest(APITestCase):
  def setUp(self):
    self.student = Student.objects.create(name='ansal')
    self.course = Course.objects.create(course_title="Intro to Computer Science Build a Search Engine & a Social Network", url="https://www.udacity.com/course/cs101")
    self.academic = Academic.objects.create(student=self.student, course=self.course)
    self.data = {'student': 'http://localhost:8000/api/students/1/', 'course': 'http://localhost:8000/api/courses/1/'}

  def test_can_create_academics(self):
    response = self.client.post(reverse('academic-list'), self.data)
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class ReadAcademicTest(APITestCase):
  def setUp(self):
    self.student = Student.objects.create(name='ansal')
    self.course = Course.objects.create(course_title="Intro to Computer Science Build a Search Engine & a Social Network", url="https://www.udacity.com/course/cs101")
    self.academic = Academic.objects.create(student=self.student, course=self.course)

  def test_can_read_academic_list(self):
    response = self.client.get(reverse('academic-list'))
    self.assertEqual(response.status_code, status.HTTP_200_OK)

  def test_can_read_academic_detail(self):
    response = self.client.get(reverse('academic-detail', args=[self.academic.id]))
    self.assertEqual(response.status_code, status.HTTP_200_OK)

class UpdateAcademicTest(APITestCase):
  def setUp(self):
    self.student = Student.objects.create(name='ansal')
    self.course = Course.objects.create(course_title="Intro to Computer Science Build a Search Engine & a Social Network", url="https://www.udacity.com/course/cs101")
    self.academic = Academic.objects.create(student=self.student, course=self.course)
    self.new_student = Student.objects.create(name='santu')
    self.updated_academic = Academic.objects.create(student=self.new_student, course=self.course)
    self.data = AcademicSerializer(self.updated_academic).data
  
  def test_can_update_academic(self):
    response = self.client.put(reverse('academic-detail', args=[self.academic.id]), self.data)
    self.assertEqual(response.status_code, status.HTTP_200_OK)


class DeleteAcademicTest(APITestCase):
  def setUp(self):
    self.student = Student.objects.create(name='ansal')
    self.course = Course.objects.create(course_title="Intro to Computer Science Build a Search Engine & a Social Network", url="https://www.udacity.com/course/cs101")
    self.academic = Academic.objects.create(student=self.student, course=self.course)
  
  def test_can_update_academic(self):
    response = self.client.delete(reverse('academic-detail', args=[self.academic.id]))
    self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
 