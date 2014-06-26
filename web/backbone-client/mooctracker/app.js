var MoocTracker = MoocTracker || {};

(function(){

  // extend backbone views to add a close method to remove zombies
  Backbone.View.prototype.close = function() {
    this.remove();
    this.unbind();
    if (this.onClose){
      this.onClose();
    }
  };
  // for managing view transitions
  function AppView(){

    var $container = $('#container');
     
     this.showView = function(view) {

      if (this.currentView) {
        this.currentView.close();
      }
      this.currentView = view;
      this.currentView.render();
      $container.html('').append(view.render().$el);
    }

  }

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