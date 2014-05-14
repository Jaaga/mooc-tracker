// globalbackbone app

var app = app || {};

$(function(){

  // start things by starting the main view
  new app.MainView();
  // fetch the collection
  app.StudentCollection.fetch({
    reset: true
  });
});