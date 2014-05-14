// global backbone app
var app = app || {};

(function(){
  'use strict';

  app.StudentView = Backbone.View.extend({

    tagName: 'li',

    render: function () {

      this.$el.html(this.model.get('name'));
      return this;

    }

  });


})();