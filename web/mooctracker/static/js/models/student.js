// global backbone app
var app = app || {};

(function(){
  'use strict';

  // the student model

  app.Student = Backbone.Model.extend({
    defaults: {
      name: 'Unknown Name'
    },
    idAttribute: 'id'
  });


})();