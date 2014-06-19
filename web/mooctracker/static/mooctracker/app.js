var MoocTracker = MoocTracker || {};

(function(){

  // extend backbone views to add a close method to remove zombies
  Backbone.View.prototype.close = function() {
    this.remove();
    this.unbind();
  };

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