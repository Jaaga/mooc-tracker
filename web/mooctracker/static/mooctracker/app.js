var MoocTracker = MoocTracker || {};

(function(){

  var MC = MoocTracker;

  // fetch all the models
  MC.Courses.fetch({
    reset: true
  });
  MC.StudentCourses.fetch({
    reset: true
  });
  MC.Projects.fetch({
    reset: true
  });
  MC.Students.fetch({
    reset: true
  });

  // start the routes
  MC.MoocTrackerRouter = new MC.Router();
  Backbone.history.start();

})();