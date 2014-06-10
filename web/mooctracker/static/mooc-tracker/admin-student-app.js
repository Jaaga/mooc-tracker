// global backbone app
var app = app || {};

(function(){
  'use strict';

  // fetch the models
  app.StudentCourseCollection.fetch({
    reset: true
  });
  app.ProjectCollection.fetch({
    reset: true
  });

  app.courseView = new app.AdminStudentMainView();


})();