// global backbone app
var app = app || {};

(function(){
  'use strict';

  // collection for studentcourse model
  // again dont confuse with the course collection

  var studentCourseCollection = Backbone.Collection.extend({
    model: app.StudentCourse,
    url : '/studentcourse'
  });

  app.StudentCourseCollection = new studentCourseCollection();

})();