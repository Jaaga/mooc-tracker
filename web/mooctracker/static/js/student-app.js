// globalbackbone app

var app = app || {};

$(function() {

  // start painting things by starting the main view
  new app.StudentMainView();

  // fetch the courses
  app.CourseCollection.fetch();

  // fetch the projects
  app.ProjectCollection.fetch();
  
});