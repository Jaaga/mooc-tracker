// globalbackbone app

var app = app || {};

$(function() {

  // start things by starting the main view
  new app.StudentMainView();

  app.CourseCollection.fetch();
  
});