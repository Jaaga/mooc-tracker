// global backbone app
var app = app || {};

var ENTER_KEY = 13;

(function(){
  'use strict';

  // main view
  app.MainView = Backbone.View.extend({

    el : '#app',

    events: {
      'keyup #newStudent': 'createOnEnter'
    },

    initialize: function() {

      // cache DOMs
      this.$newStudent = this.$('#newStudent');
      this.$studentList = this.$('#studentList');

      // listen to events
      this.listenTo(app.StudentCollection, 'add', this.addOne);
      this.listenTo(app.StudentCollection, 'reset', this.addAll);

    },

    createOnEnter: function(e) {

      var student = this.$newStudent.val().trim();

      if(e.which !== ENTER_KEY || !student) {
       return;
      }

      app.StudentCollection.create({
        name: student
      });

      this.$newStudent.val('');

    },

    addOne: function(student) {
      var view = new app.StudentView({model: student});
      this.$studentList.append(view.render().el);
    },

    addAll: function() {
      this.$studentList.html('');
      app.StudentCollection.each(this.addOne, this);

    }

  });

})();