// global backbone app
var app = app || {};

(function(){
  'use strict';

  // collection for students model

  var courseCollection = Backbone.Collection.extend({
    model: app.Course,

    // save all the courses to localstorage for time being
    localStorage: new Backbone.LocalStorage('mooc-tracker-backbone')
  });

  app.CourseCollection = new courseCollection();

})();