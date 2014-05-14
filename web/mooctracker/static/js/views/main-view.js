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

      this.$newStudent = this.$('#newStudent');

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

    }

  });

})();