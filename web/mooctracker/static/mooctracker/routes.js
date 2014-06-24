var MoocTracker = MoocTracker || {};

(function(){

  var MC = MoocTracker;
  var $container = $('#container');

  // add an object to keep track of views

  MC.Router = Backbone.Router.extend({

    routes: {

      // student routes

      // dashboard
      'app/student': 'studentDashboard',

      // course
      'app/student/courses': 'studentCourses',
      'app/student/course/:id': 'showStudentCourse',
      'app/student/courses/new': 'newStudentCourse',

      // projects
      'app/student/projects': 'studentProjects',
      'app/student/project/:id': 'showStudentProject',
      'app/student/projects/new': 'newStudentProject',   

      // admin routes

      // dashboard
      'app/admin': 'adminDashboard',

      // courses
      'app/admin/courses': 'adminCourses',
      'app/admin/courses/new': 'newAdminCourse',
      'app/admin/course/:id': 'showAdminCourse',

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

    newStudentCourse: function() {
      var view = new MC.StudentCourseFormView();
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

    showStudentProject: function(id) {
      var model = MC.Projects.get(id);
      var view = new MC.StudentProjectPageView({ model: model });
      $container.html('').append(view.render().$el);
      view.showGithubInfo();
    },

    // admin route methods

    adminDashboard: function() {
      var view = new MC.AdminDashboardView();
      $container.html('').append(view.render().$el);
    },

    adminCourses: function() {
      var view = new MC.AdminCoursesView();
      $container.html('').append(view.render().$el);
      view.addAllCoursesViews();
    },

    newAdminCourse: function() {
      var view = new MC.AdminCourseFormView();
      $container.html('').append(view.render().$el);
    },

    showAdminCourse: function(id) {
      var model = MC.Courses.get(id);
      var view = new MC.AdminCoursePageView({ model: model });
      $container.html('').append(view.render().$el);
    }

  });

})();