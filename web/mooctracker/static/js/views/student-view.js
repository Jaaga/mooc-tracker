// global backbone app
var app = app || {};

(function(){
  'use strict';

  app.StudentView = Backbone.View.extend({

    tagName: 'li',

    template: _.template($('#studentTemplate').html()),

    events : {

      'click .studentRemoveButton' : 'removeStudent'

    },

    initialize: function() {

      this.listenTo(this.model, 'destroy', this.remove);

    },

    render: function () {

      this.$el.html(
        this.template(this.model.toJSON())
      );
      return this;

    },

    removeStudent : function (e) {

      this.$('.studentRemoveButton').attr('disabled', true);
      e.preventDefault();
      this.model.destroy()

    }

  });


})();