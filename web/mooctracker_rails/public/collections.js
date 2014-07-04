var MoocTracker = MoocTracker || {};

(function(){
  'use strict';

  var MC = MoocTracker;

  var CourseCollection = Backbone.Collection.extend({
    model: MC.Course,
    url : '/api/course'
  });

  var ProjectCollection = Backbone.Collection.extend({
    model: MC.Project,
    url : '/api/project'
  });

  var StudentCourseCollection = Backbone.Collection.extend({
    model: MC.StudentCourse,
    url : '/api/studentcourse'
  });

  var StudentCollection = Backbone.Collection.extend({
    model: MC.Student,
    url : '/api/student'
  });

  // create instances of above collections

  MC.Courses = new CourseCollection();
  MC.Projects = new ProjectCollection();
  MC.StudentCourses = new StudentCourseCollection();
  MC.Students = new StudentCollection();
  

})();