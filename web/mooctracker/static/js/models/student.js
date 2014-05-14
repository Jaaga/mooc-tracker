// global backbone app
var app = app || {};

(function(){
  'use strict';

  // the student model

  app.Student = Backbone.Model.extend({
    defaults: {
      title: 'Unknown Name'
    },
    idAttribute: 'id'
  });


})();