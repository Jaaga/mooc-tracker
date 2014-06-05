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

      'click #addCourseButton': 'showCourseForm',
      'click #saveCourseButton': 'saveCourse'

    },

    initialize: function() {

      // cache all DOM elements
      this.$courseForm = $('#courseForm');
      this.$courseNameSelect = $('#courseName');
      this.$courseStart = $('#courseStart');
      this.$courseEnd = $('#courseEnd');
      this.$newCourseFormError = $('#newCourseFormError');

      // cache template
      this.courseSelectTemplate = _.template(
        $('#courseSelectTemplate').html()
      );

      // add model event listeners
      this.listenTo(app.CourseCollection, 'reset', this.addCoursesToSelect);

    },

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
    }

  });


})();