// global backbone app
var app = app || {};

(function(){
  'use strict';

  // collection for students model

  var courseCollection = Backbone.Collection.extend({
    model: app.Course,
    url : '/course'
  });

  app.CourseCollection = new courseCollection();

})();