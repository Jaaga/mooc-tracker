var MoocTracker = MoocTracker || {};

(function(){
  'use strict';

  var MC = MoocTracker;

  // student dashboard view
  MC.StudentDashboardView = Backbone.View.extend({

    el: '#app',
    template: _.template( $('#studentDashboardTemplate').html() ),

    initialize: function() {

      // caching dom elements
      this.$appMenus = $('#appMenus');

      // caching templates
      this.menuTemplate = _.template( $('#studentMenus').html() );

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

  // student courses view
  MC.StudentCoursesView = Backbone.View.extend({

    el: '#app',
    template: _.template( $('#studentCoursesTemplate').html() ),

    initialize: function() {

      // caching dom elements
      this.$appMenus = $('#appMenus');

      // caching templates
      this.menuTemplate = _.template( $('#studentMenus').html() );

    },

    render: function() {

      // load the menus first
      this.$appMenus.html( this.menuTemplate() );
      this.$appMenus.find('li#coursesLi').addClass('active');

      // draw the main body app
      var html = this.template();
      this.$el.html(html);

      return this;
    },

    addOneCourseView: function(course) {
      var view = new MC.StudentCourseView({ model: course});
      this.$el.find('#studentCourses').append(view.render().$el);
    },

    addAllCoursesViews: function() {
      MC.StudentCourses.each(this.addOneCourseView, this);
    }

  });

  // individual student course view
  MC.StudentCourseView = Backbone.View.extend({

    tagName: 'li',
    template: _.template( $('#studentCourseTemplate').html() ),

    initialize: function() {

    },

    render: function() {
      var html = this.template(this.model.toJSON());
      this.$el.html(html);
      return this;
    }

  });

  // individual student course page with edit and delete options
  MC.StudentCourseView = Backbone.View.extend({

    el: '#',
    template: _.template( $('#studentCourseTemplate').html() ),

    initialize: function() {

    },

    render: function() {
      var html = this.template(this.model.toJSON());
      this.$el.html(html);
      return this;
    }

  });

  // form view for creating new student course
  MC.StudentProjectFormView = Backbone.View.extend({

    el: '#app',
    template: _.template( $('#studentCourseForm').html() ),

    events: {
      'click #saveNewCourseButton': 'addCourse'
    },

    initialize: function() {

      // caching dom elements
      this.$appMenus = $('#appMenus');

      // caching templates
      this.menuTemplate = _.template( $('#studentMenus').html() );

    },

    render: function() {

      // load the menus first
      this.$appMenus.html( this.menuTemplate() );
      this.$appMenus.find('li#coursesLi').addClass('active');

      // draw the main body app
      var html = this.template();
      this.$el.html(html);

      return this;
    },

    addCourse: function(e) {
      e.preventDefault();
      var course = this.buildFormAttributes();
      if(typeof course === 'undefined') {
        this.$el.find('.alert').show();
        return;
      }
      MC.StudentCourses.create(course);
    },

    buildFormAttributes: function() {
      var $select = this.$el.find('#studentCourseName');
      var course = $select.val();
      var courseTitle = $('#studentCourseName option:selected').text();
      var courseStart = this.$el.find('#courseStart').val();
      var courseEnd = this.$el.find('#courseEnd').val();
      console.log(course, courseTitle, courseStart, courseEnd)
      if ( course === '0' ||
            !courseTitle ||
            !courseStart ||
            !courseEnd
      ) {
        return undefined;
      }
      var studentCourse = {
        course: course,
        courseTitle: courseTitle,
        courseStart: courseStart,
        courseEnd: courseEnd
      };
      return studentCourse;
    }

  });

  // student projects view
  MC.StudentProjectsView = Backbone.View.extend({

    el: '#app',
    template: _.template( $('#studentProjectsTemplate').html() ),

    initialize: function() {

      // caching dom elements
      this.$appMenus = $('#appMenus');

      // caching templates
      this.menuTemplate = _.template( $('#studentMenus').html() );

    },

    render: function() {

      // load the menus first
      this.$appMenus.html( this.menuTemplate() );
      this.$appMenus.find('li#projectsLi').addClass('active');

      // draw the main body app
      var html = this.template();
      this.$el.html(html);

      return this;
    },

    addOneProjectView: function(project) {
      var view = new MC.StudentProjectView({ model: project});
      this.$el.find('#studentProjects').html(view.render().$el);
    },

    addAllProjectsViews: function() {
      MC.Projects.each(this.addOneProjectView, this);
    }

  });

  // individual student project view
  MC.StudentProjectView = Backbone.View.extend({

    tagName: 'li',
    template: _.template( $('#studentProjectTemplate').html() ),

    initialize: function() {

    },

    render: function() {
      var html = this.template(this.model.toJSON());
      this.$el.html(html);
      return this;
    }

  });

})();