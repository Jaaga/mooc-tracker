// global backbone app
var app = app || {};

(function(){
  'use strict';

  app.ProjectMainView = Backbone.View.extend({

    el: '#app',

    events: {
      'click #addProjectButton': 'showProjectForm',
      'click #saveProjectButton': 'saveProject',      
    },

    initialize: function() {

      // cache all DOM elements
      this.$projectForm = $('#projectForm');
      this.$projectTitle = $('#newProjectTitle');
      this.$projectDescription = $('#newProjectDescription');
      this.$projectSite = $('#newProjectSite');
      this.$githubUrl = $('#newGithubUrl');
      this.$projectList = $('#projectList');
      this.$projectCount = $('#projectCount');
      this.$newProjectFormError = $('#newProjectFormError');
      this.$projectCount = $('#projectCount');

      // project related
      this.listenTo(app.ProjectCollection, 'add', this.addOneProject);
      this.listenTo(app.ProjectCollection, 'reset', this.addAllProjects);
      this.listenTo(app.ProjectCollection, 'remove', this.showProjectLength);

    },
    
    projectFormReset: function() {
      this.$newProjectFormError.hide();
      this.$projectTitle.val('');
      this.$projectDescription.val('');
      this.$projectSite.val('');
      this.$githubUrl.val('');
    },

    showProjectForm: function() {
      this.projectFormReset();
      this.$projectForm.fadeToggle();
    },

    buildProjectAttributes: function() {
      // same technique used in buildCourseAttributes
      // one thing I'm experiencing with backbone lately is -
      // too much boilerplate code..... may be its time to
      // checkout Backbone.Marionette!
      var title = this.$projectTitle.val();
      var description = this.$projectDescription.val();
      var projectSite = this.$projectSite.val();
      var githubUrl = this.$githubUrl.val();

      // validate
      if( !title || !description || !projectSite || !githubUrl) {
        this.$newProjectFormError.fadeIn();
        return undefined;
      }

      var project = {
        title: title,
        description: description,
        projectSite: projectSite,
        githubUrl: githubUrl
      };

      return project;

    },

    saveProject: function() {
      var project = this.buildProjectAttributes();
      if (typeof project === 'undefined') {
        return;
      }
      app.ProjectCollection.create(project);
      this.$projectForm.fadeOut();
    },

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