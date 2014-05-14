// global backbone app
var app = app || {};

(function(){
  'use strict';

  // collection for students model

  var studentCollection = Backbone.Collection.extend({
    model: app.Student,
    url: '/api/students/'
  });

  app.StudentCollection = new studentCollection();

})();