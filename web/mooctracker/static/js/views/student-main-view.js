// global backbone app
var app = app || {};

(function(){
  'use strict';

  // main view
  app.StudentMainView = Backbone.View.extend({

    el : '#app',

    events: {
      'click #addCourseButton': 'showCourseForm',
      'click #saveCourseButton': 'saveNewCourse',

      'click #addProjectButton': 'showProjectForm',
      'click #saveProjectButton': 'saveNewProject'
    },

    initialize: function() {

      // cache DOMs

      // course elements
      this.$courseForm = $('#courseForm');
      this.$newCourseTitle = $('#newCourseTitle');
      this.$newCourseUniversity = $('#newCourseUniversity');
      this.$newCourseStart = $('#newCourseStart');
      this.$newCourseEnd = $('#newCourseEnd');
      this.$newCourseFormError = $('#newCourseFormError');
      this.$courseList = $('#courseList');
      this.$saveCourseButton = $('#saveCourseButton');
      this.$courseCount = $('#courseCount');

      // project elements
      this.$projectForm = $('#projectForm');
      this.$addProjectButton = $('#addProjectButton');
      this.$saveProjectButton = $('#saveProjectButton');
      this.$newProjectName = $('#newProjectName');
      this.$newProjectDescription = $('#newProjectDescription');
      this.$newProjectSite = $('#newProjectSite');
      this.$newGithubUrl = $('#newGithubUrl');
      this.$newProjectFormError = $('#newProjectFormError');
      this.$projectList = $('#projectList');

      // listen to events
      this.listenTo(app.CourseCollection, 'add', this.addOneCourse);
      this.listenTo(app.ProjectCollection, 'add', this.addOneProject);

    },

    showCourseForm: function() {

      this.clearCourseForm();
      this.$courseForm.fadeToggle();

    },

    saveNewCourse: function() {

      // disable button
      this.$saveCourseButton.attr('disabled', true);

      // validation
      var title = this.$newCourseTitle.val();
      var university = this.$newCourseUniversity.val();
      var start = this.$newCourseStart.val();
      var end = this.$newCourseEnd.val();

      if(!title || !university || !start || !end) {

        this.$newCourseFormError.show('fast');
        this.$saveCourseButton.attr('disabled', false);
        return;
        
      }

      // create the course by adding model into course collection
      app.CourseCollection.create({

        name: title,
        university: university,
        startDate: start,
        endDate: end,
        finished: false

      });

      this.showCourseForm();

    },

    addOneCourse: function(course) {
      var view = new app.CourseView({model: course});
      this.$courseList.append(view.render().el);
      this.showCourseCount();
    },

    showCourseCount: function() {

      this.$courseCount.html(app.CourseCollection.length);

    },

    clearCourseForm: function() {
      this.$newCourseFormError.hide();
      this.$newCourseTitle.val('');
      this.$newCourseUniversity.val('');
      this.$newCourseStart.val('');
      this.$newCourseEnd.val('');
      this.$saveCourseButton.attr('disabled', false);
    },

    showProjectForm: function() {

      this.clearProjectForm();
      this.$projectForm.fadeToggle();

    },

    saveNewProject: function() {

      // disable button
      this.$saveProjectButton.attr('disabled', true);

      // validation
      var name = this.$newProjectName.val();
      var description = this.$newProjectDescription.val();
      var projectSite = this.$newProjectSite.val();
      var githubUrl = this.$newGithubUrl.val();

      if(!name || !description || !projectSite || !githubUrl) {

        this.$saveProjectButton.attr('disabled', false);
        this.$newProjectFormError.show('fast');
        return;

      }

      // create the project
      app.ProjectCollection.create({
        name: name,
        description: description,
        projectUrl: projectSite,
        githubUrl: githubUrl
      });

      this.showProjectForm();

    },

    addOneProject: function(project) {
      var view = new app.ProjectView({model: project});
      this.$projectList.append(view.render().el);
      this.showCourseCount();
    },

    clearProjectForm: function() {
      this.$newProjectFormError.hide();
      this.$newProjectName.val('');
      this.$newProjectDescription.val('');
      this.$newProjectSite.val('');
      this.$newGithubUrl.val('');
      this.$saveProjectButton.attr('disabled', false);
    },

  });

})();