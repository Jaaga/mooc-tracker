// global backbone app
var app = app || {};

(function(){
  'use strict';

  // the course model

  app.Course = Backbone.Model.extend({
    defaults: {
      name: 'Unknown Project',
      university: 'Unknown University',
      finished: false,
      startDate: new Date(),
      endDate: new Date()
    }
  });


})();