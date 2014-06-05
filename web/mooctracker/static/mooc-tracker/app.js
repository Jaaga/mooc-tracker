// global backbone app
var app = app || {};

(function(){
  'use strict';

  // fetch the models
  app.CourseCollection.fetch({
    reset: true
  });

  new app.StudentMainView();


})();