// global backbone app
var app = app || {};

(function(){
  'use strict';

  // main view
  app.StudentMainView = Backbone.View.extend({

    el : '#app',

    events: {
      'click #addCourseButton': 'showCourseForm',
      'click #saveCourseButton': 'saveNewCourse'
    },

    initialize: function() {

      // cache DOMs
      this.$courseForm = $('#courseForm');
      this.$newCourseTitle = $('#newCourseTitle');
      this.$newCourseUniversity = $('#newCourseUniversity');
      this.$newCourseStart = $('#newCourseStart');
      this.$newCourseEnd = $('#newCourseEnd');
      this.$newCourseFormError = $('#newCourseFormError');
      this.$courseList = $('#courseList');
      this.$saveCourseButton = $('#saveCourseButton');
      this.$courseCount = $('#courseCount');

      // listen to events
      this.listenTo(app.CourseCollection, 'add', this.addOne);
      //this.listenTo(app.Todos, 'reset', this.addAll);

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

      this.clearCourseForm();
      this.showCourseForm();

    },

    addOne: function(course) {
      var view = new app.CourseView({model: course});
      this.$courseList.append(view.render().el);
      this.showCourseCount();
    },

    addAll: function() {
      this.showStudentsCount();
      this.$studentList.html('');
      app.StudentCollection.each(this.addOne, this);

    },

    showCourseCount: function() {

      this.$courseCount.html(app.CourseCollection.length);

    },

    clearCourseForm: function() {
      this.$newCourseTitle.val('');
      this.$newCourseUniversity.val('');
      this.$newCourseStart.val('');
      this.$newCourseEnd.val('');
      this.$saveCourseButton.attr('disabled', false);
    }

  });

})();