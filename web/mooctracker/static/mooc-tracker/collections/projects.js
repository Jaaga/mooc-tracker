// global backbone app
var app = app || {};

(function(){
  'use strict';

  // collection for students model

  var projectCollection = Backbone.Collection.extend({
    model: app.Project,
    url : '/project'
  });

  app.ProjectCollection = new projectCollection();

})();