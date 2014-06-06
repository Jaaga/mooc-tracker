// global backbone app
var app = app || {};

(function(){
  'use strict';

  app.AdminStudentMainView = Backbone.View.extend({

    el: '#app',

    events: {
    },

    initialize: function() {

      // cache all DOM elements

      // course related
      this.$courseList = $('#courseList');
      this.$courseCount = $('#courseCount');

      this.$projectList = $('#projectList');
      this.$projectCount = $('#projectCount');

      // add model event listeners

      // course related
      this.listenTo(app.StudentCourseCollection, 
        'add', this.addOneStudentCourseView);
      this.listenTo(app.StudentCourseCollection, 
        'reset', this.addAllStudentCourse);

      // project related
      this.listenTo(app.ProjectCollection, 'add', this.addOneProject);
      this.listenTo(app.ProjectCollection, 'reset', this.addAllProjects);

    },

    // course related methods

    addOneStudentCourseView: function(studentCourse) {
      var view  = new app.StudentCourseView({
        model: studentCourse
      });
      this.$courseList.append(
        view.render().el
      );
      this.showCourseLength();
    },

    addAllStudentCourse: function() {
      this.$courseList.html('');
      app.StudentCourseCollection.each(this.addOneStudentCourseView, this);
    },

    showCourseLength: function() {
      // update the course count
      // todo: make it more efficient by not repainting -
      // too many times
      this.$courseCount.html( app.StudentCourseCollection.length );
    },

    // project related methods

    addOneProject: function(project) {
      var view = new app.ProjectView({
        model: project
      });
      this.$projectList.append(view.render().el);
      this.showProjectLength();
    },

    addAllProjects: function() {
      this.$projectList.html('');
      app.ProjectCollection.each(this.addOneProject, this);
    },

    showProjectLength: function() {
      this.$projectCount.html( app.ProjectCollection.length );
    }

  });


})();