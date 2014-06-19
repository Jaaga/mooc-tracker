var MoocTracker = MoocTracker || {};

(function(){

  var MC = MoocTracker;
  var $container = $('#container');

  // add an object to keep track of views

  MC.Router = Backbone.Router.extend({

    routes: {

      // student routes
      'app/student': 'studentDashboard',
      'app/student/courses': 'studentCourses',
      'app/student/course/:id': 'showStudentCourse',
      'app/student/projects': 'studentProjects',
      'app/student/courses/new': 'newStudentProject'

    },

    // student route methods

    studentDashboard: function() {
      var view = new MC.StudentDashboardView();
      $container.html('').append(view.render().$el);
    },

    studentCourses: function() {
      var view = new MC.StudentCoursesView();
      $container.html('').append(view.render().$el);
      view.addAllCoursesViews();
    },

    showStudentCourse: function(id) {
      var model = MC.StudentCourses.get(id);
      var view = new MC.StudentCoursePageView({ model: model });
      $container.html('').append(view.render().$el);
    },

    studentProjects: function() {
      var view = new MC.StudentProjectsView();
      $container.html('').append(view.render().$el);
      view.addAllProjectsViews();
    },

    newStudentProject: function() {
      var view = new MC.StudentProjectFormView();
      $container.html('').append(view.render().$el);
    },

  });

})();