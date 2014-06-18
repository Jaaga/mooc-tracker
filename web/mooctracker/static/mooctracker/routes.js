var MoocTracker = MoocTracker || {};

(function(){

  var MC = MoocTracker;

  MC.Router = Backbone.Router.extend({

    routes: {

      // student routes
      'app/student': 'studentDashboard',
      'app/student/courses': 'studentCourses',
      'app/student/course/id': 'showStudentCourse',
      'app/student/projects': 'studentProjects',

    },

    // student route methods

    studentDashboard: function() {
      var view = new MC.StudentDashboardView();
      view.render();
    },

    studentCourses: function() {
      var view = new MC.StudentCoursesView();
      view.render();
      view.addAllCoursesViews();
    },

    showStudentCourse: function() {
      var view = MC.StudentCoursePageView();
      view.render();
    },

    studentProjects: function() {
      var view = new MC.StudentProjectsView();
      view.render();
      view.addAllProjectsViews();
    },

    newStudentProject: function() {
      var view = new MC.StudentProjectFormView();
      view.render();
    },

  });

})();