// global backbone app
var app = app || {};

(function(){
  'use strict';

  // main view which loads the forms for adding courses, projects
  // this view also fires up individual views, like list of
  // projects etc
  app.StudentMainView = Backbone.View.extend({

    el: '#app',

    events: {
      // those related to course
      'click #addCourseButton': 'showCourseForm',
      'click #saveCourseButton': 'saveCourse',

      // those related to project
      'click #addProjectButton': 'showProjectForm',
      'click #saveProjectButton': 'saveProject',      
    },

    initialize: function() {

      // cache all DOM elements

      // course related
      this.$courseForm = $('#courseForm');
      this.$courseNameSelect = $('#courseName');
      this.$courseStart = $('#courseStart');
      this.$courseEnd = $('#courseEnd');
      this.$newCourseFormError = $('#newCourseFormError');
      this.$courseList = $('#courseList');
      this.$courseCount = $('#courseCount');

      // project related
      this.$projectForm = $('#projectForm');
      this.$projectTitle = $('#newProjectTitle');
      this.$projectDescription = $('#newProjectDescription');
      this.$projectSite = $('#newProjectSite');
      this.$githubUrl = $('#newGithubUrl');
      this.$projectList = $('#projectList');
      this.$projectCount = $('#projectCount');
      this.$newProjectFormError = $('#newProjectFormError');
      this.$projectCount = $('#projectCount');


      // cache template
      this.courseSelectTemplate = _.template(
        $('#courseSelectTemplate').html()
      );

      // add model event listeners

      // course related
      this.listenTo(app.CourseCollection, 'reset', this.addCoursesToSelect);
      this.listenTo(app.StudentCourseCollection, 
        'add', this.addOneStudentCourseView);
      // todo: make this call efficient too
      this.listenTo(app.StudentCourseCollection, 'remove', this.showCourseLength);
      this.listenTo(app.StudentCourseCollection, 
        'reset', this.addAllStudentCourse);

      // project related
      this.listenTo(app.ProjectCollection, 'add', this.addOneProject);
      this.listenTo(app.ProjectCollection, 'reset', this.addAllProjects);
      this.listenTo(app.ProjectCollection, 'remove', this.showProjectLength);

    },

    // course related methods

    // reset form elements
    courseFormReset: function() {
      this.$newCourseFormError.hide();
      this.$courseNameSelect.val('0');
      this.$courseStart.val('');
      this.$courseEnd.val('');
    },

    showCourseForm: function() {
      this.courseFormReset();
      this.$courseForm.fadeToggle();
    },

    addCoursesToSelect: function() {
      var courses = app.CourseCollection.models;
      this.$courseNameSelect.html(
        this.courseSelectTemplate({ 
          'courses': app.CourseCollection.models
        })
      );
    },

    buildCourseAttributes: function() {
      // returning nothing means we are returning undefined
      var course = this.$courseNameSelect.val();
      // for selecting title of the select box
      var elementId = this.$courseNameSelect.attr('id');
      var courseTitle = $('#' + elementId  + ' option:selected')
                        .text();
      var courseStart = this.$courseStart.val();
      var courseEnd = this.$courseEnd.val();
      // validate all fields
      // TODO: move to model validation
      // it should be fatty models, thin views :)
      if ( course === '0' ||
            !courseTitle ||
            !courseStart ||
            !courseEnd
      ) {
        // return undefined
        // TODO: can we make the returning a little better than this?
        return undefined;
      }
      var studentCourseObject = {
        course: course,
        courseTitle: courseTitle,
        courseStart: courseStart,
        courseEnd: courseEnd
      };
      return studentCourseObject;
    },

    saveCourse: function() {
      var course = this.buildCourseAttributes();
      if(typeof course === 'undefined') {
        // build attributes failed to return a course object
        // this means that a form error has occured
        // show the error message and return
        this.$newCourseFormError.fadeIn();
        return;
      }
      // hurray! we have the course! 
      // lets save it!
      app.StudentCourseCollection.create(course);
      this.$courseForm.fadeOut();
    },

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