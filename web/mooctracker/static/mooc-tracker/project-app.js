// global backbone app
var app = app || {};

(function(){
  'use strict';

  // fetch the models
  app.ProjectCollection.fetch({
    reset: true
  });

  app.projectView = new app.ProjectMainView();


})();