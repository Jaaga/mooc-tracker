// global backbone app
var app = app || {};

(function(){
  'use strict';

  app.StudentCourseView = Backbone.View.extend({

    tagName: 'li',
    template: _.template( $('#studentCourseTemplate').html() ),

    events: {
      'click .courseDeleteButton': 'deleteCourse',
      'click .showUpdates': 'showUpdates',
      'keyup .newUpdateTextBox': 'createUpdateOnEnter'
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
    },

    showUpdates: function(e) {
      e.preventDefault();
      var updatesList = this.$el.find('.updatesList');
      var newUpdateTextBoxDiv = this.$el.find('.newUpdateTextBoxDiv');
      var newUpdateTextBox = this.$el.find('.newUpdateTextBox');

      updatesList.fadeToggle();
      newUpdateTextBoxDiv.fadeToggle();
      newUpdateTextBox.val('');
    },

    createUpdateOnEnter: function(e) {
      // char code for enter key
      var ENTER_KEY = 13;
      var newUpdateTextBox = this.$el.find('.newUpdateTextBox');
      var newUpdate = newUpdateTextBox.val();
      var updatesList = this.$el.find('.updatesList');

      if(e.which === ENTER_KEY && newUpdate.trim()) {
        var updates = this.model.get('updates');
        updates.push(newUpdate);
        this.model.set('updates', updates);
        this.model.save();
        updatesList.append('<li>' + newUpdate + '</li>');
        // clear the text box for next input
        newUpdateTextBox.val('');
      }
    }

  });

})();