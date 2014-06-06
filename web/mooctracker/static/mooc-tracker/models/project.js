// global backbone app
var app = app || {};

(function(){
  'use strict';

  // the course model

  app.Project = Backbone.Model.extend({
    defaults: {
      title: 'Unknown Project',
      description: 'Project description...',
      projectSite: '#',
      githubUrl: '#'
    }
  });


})();