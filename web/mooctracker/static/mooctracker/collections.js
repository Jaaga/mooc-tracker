var MoocTracker = MoocTracker || {};

(function(){
  'use strict';

  var MC = MoocTracker;

  var CourseCollection = Backbone.Collection.extend({
    model: MC.Course,
    url : '/course'
  });

  var ProjectCollection = Backbone.Collection.extend({
    model: MC.Project,
    url : '/project'
  });

  var StudentCourseCollection = Backbone.Collection.extend({
    model: MC.StudentCourse,
    url : '/studentcourse'
  });

  var StudentCollection = Backbone.Collection.extend({
    model: MC.Student,
    url : '/student'
  });

  // create instances of above collections

  MC.Courses = new CourseCollection();
  MC.Projects = new ProjectCollection();
  MC.StudentCourses = new StudentCourseCollection();
  MC.Students = new StudentCollection();
  

})();