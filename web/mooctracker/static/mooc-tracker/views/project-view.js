// global backbone app
var app = app || {};

(function(){
  'use strict';

  app.ProjectView = Backbone.View.extend({

    tagName: 'li',
    template: _.template( $('#projectTemplate').html() ),

    events: {
      'click .projectDeleteButton': 'deleteProject'
    },

    initialize: function() {
      // cache dom elements

      // listen to model events
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      var html = this.template(
        this.model.toJSON()
      );
      this.$el.html(html);
      return this;
    },

    deleteProject: function(e) {
      e.preventDefault();
      var confirmation = confirm('Are you sure?');
      if(!confirmation) {
        return;
      }
      this.model.destroy();
    }

  });

})();