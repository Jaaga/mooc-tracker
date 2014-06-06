// global backbone app
var app = app || {};

(function(){
  'use strict';

  app.StudentCourseView = Backbone.View.extend({

    tagName: 'li',
    template: _.template( $('#studentCourseTemplate').html() ),

    events: {
      'click .courseDeleteButton': 'deleteCourse'
    },

    initialize: function() {

      // cache dom elements

      //listen to model changes
      this.listenTo(this.model, 'destroy', this.remove);

    },

    render: function() {
      var html = this.template(
        this.model.toJSON()
      );
      this.$el.html(html);
      return this;
    },

    deleteCourse: function(e) {
      e.preventDefault();
      var confirmation = confirm('This will delete all your updates too. Are you sure?');
      if(!confirmation) {
        return;
      }
      this.model.destroy();
    }

  });

})();