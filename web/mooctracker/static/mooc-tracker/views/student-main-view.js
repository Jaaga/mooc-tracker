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

      'click #addCourseButton': 'showCourseForm'

    },

    initialize: function() {

      // cache all DOM elements
      this.$courseForm = $('#courseForm');
      this.$courseNameSelect= $('#courseName');

      // cache template
      this.courseSelectTemplate = _.template(
        $('#courseSelectTemplate').html()
      );

      // add model event listeners
      this.listenTo(app.CourseCollection, 'reset', this.addCoursesToSelect);

    },

    showCourseForm: function() {
      this.$courseForm.fadeToggle();
    },

    addCoursesToSelect: function() {
      var courses = app.CourseCollection.models;
      this.$courseNameSelect.html(
        this.courseSelectTemplate({ 
          'courses': app.CourseCollection.models
        })
      );
    }

  });


})();