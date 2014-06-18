var MoocTracker = MoocTracker || {};

(function(){
  'use strict';

  var MC = MoocTracker;

  // course model
  // created by admin
  // most probably lives in a select bar for students
  MC.Course = Backbone.Model.extend({
    defaults: {
      courseTitle: 'Unknown Course'
    }
  });

  // project model created by students
  MC.Project = Backbone.Model.extend({
    defaults: {
      title: 'Unknown Project',
      description: 'Project description...',
      projectSite: '#',
      githubUrl: '#'
    }
  });

  // course model for students
  // contains an embedded array for storing updates
  MC.StudentCourse = Backbone.Model.extend({
    defaults: {
      updates: []
    }
  });

  // student model
  // usually used in admin views
  MC.Student = Backbone.Model.extend({
  });


})();