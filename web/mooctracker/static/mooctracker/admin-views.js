var MoocTracker = MoocTracker || {};

(function(){
  'use strict';

  var MC = MoocTracker;

  // admin dashboard view
  MC.AdminDashboardView = Backbone.View.extend({

    tagName: 'div',
    idName: 'app',
    template: _.template( $('#adminDashboardTemplate').html() ),

    initialize: function() {

      // caching dom elements
      this.$appMenus = $('#appMenus');

      // caching templates
      this.menuTemplate = _.template( $('#adminMenus').html() );

    },

    render: function() {

      // load the menus first
      this.$appMenus.html( this.menuTemplate() );
      this.$appMenus.find('li').removeClass('active');
      this.$appMenus.find('li#dashboardLi').addClass('active');

      // draw the main body app
      var html = this.template();
      this.$el.html(html);

      return this;
    }

  });

})();