// global backbone app

var app = app || {};

(function(){
  'use strict';

  app.CourseView = Backbone.View.extend({

    tagName: 'li',

    template: _.template($('#courseTemplate').html()),

    events: {
      
    },

    initialize: function() {


    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

  });

})();