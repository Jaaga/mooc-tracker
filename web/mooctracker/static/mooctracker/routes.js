var MoocTracker = MoocTracker || {};

(function(){

  var MC = MoocTracker;

  MC.Router = Backbone.Router.extend({

    routes: {

      'app/student': 'studentDashboard'

    },


    studentDashboard: function() {
      console.log('Write view for studentDashboard');
    }


  });

})();