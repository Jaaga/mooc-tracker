var MoocTracker = MoocTracker || {};

(function(){
  'use strict';

  var MC = MoocTracker;

  // student dashboard view
  MC.StudentDashboardView = Backbone.View.extend({

    tagName: 'div',
    idName: 'app',
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

    tagName: 'div',
    idName: 'app',
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
      $('#studentCourses').append(view.render().$el);
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
      var html = this.template({
        course: this.model
      });
      this.$el.html(html);
      return this;
    }

  });

  // individual student course page with edit and delete options
  MC.StudentCoursePageView = Backbone.View.extend({

    tagName: 'div',
    idName: 'app',
    template: _.template( $('#studentCoursePageTemplate').html() ),

    events: {
      'click .deleteStudentCourseButton': 'deleteStudentCourse',
      'click .showStudentCourseTimeUpdate': 'updateCourseTime',
      'keyup #newProjectUpdate': 'addCourseUpdate'
    },

    initialize: function() {

      // model events
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);

    },

    render: function() {
      var html = this.template(this.model.toJSON());
      this.$el.html(html);
      this.$el.find('#newProjectUpdate').focus();
      return this;
    },

    updateCourseTime: function(e) {

      var $formDiv = $('#courseTimeUpdateDiv');
      var $button = $('.showStudentCourseTimeUpdate');

      if($formDiv.css('display') === 'none') {
        $formDiv
        .show('fast');
        $button
        .removeClass('btn-info')
        .addClass('btn-success')
        .text('Save');
        return;
      }

      // if we reach here it means that user has changed the dates
      var startDate = $('#courseStartUpdate').val();
      var endDate = $('#courseEndUpdate').val();

      if(!startDate || !endDate) {
        window.alert('Hey there, we need both start and end dates!\n\nPlease try again.');
        return;
      }

      this.model.set('courseStart', startDate);
      this.model.set('courseEnd', endDate);
      this.model.save();

      $formDiv
      .hide('fast');
      $button
      .removeClass('btn-success')
      .addClass('btn-info')
      .html('<span class="glyphicon glyphicon-pencil"></span> Update Time');

    },

    addCourseUpdate: function(e) {
      // only if enter key is pressed
      if(e.which !== 13) {
        return;
      }
      var $newProjectUpdate = $('#newProjectUpdate');
      var update = $newProjectUpdate.val().trim();
      if(!update) {
        return;
      }

      var updates = this.model.get('updates');
      updates.push(update);

      this.model.set('updates', updates);
      this.model.save();

    },

    deleteStudentCourse: function() {
      var confirmation = window.confirm('This will remove all your updates too. Are you sure?');
      if(!confirmation) {
        return;
      }
      this.model.destroy();
      window.location.href='#/app/student/courses';
    }

  });

  // form view for creating new student course
  MC.StudentProjectFormView = Backbone.View.extend({

    tagName: 'div',
    idName: 'app',
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
      window.location.href='#/app/student/courses';
    },

    buildFormAttributes: function() {
      var $select = this.$el.find('#studentCourseName');
      var course = $select.val();
      var courseTitle = $('#studentCourseName option:selected').text();
      var courseStart = this.$el.find('#courseStart').val();
      var courseEnd = this.$el.find('#courseEnd').val();
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

    tagName: 'div',
    idName: 'app',
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