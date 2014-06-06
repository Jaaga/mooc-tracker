// global backbone app
var app = app || {};

(function(){
  'use strict';

  // fetch the models
  app.CourseCollection.fetch({
    reset: true
  });
  app.StudentCourseCollection.fetch({
    reset: true
  });
  app.ProjectCollection.fetch({
    reset: true
  });

  new app.StudentMainView();


})();