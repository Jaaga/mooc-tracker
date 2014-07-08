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

  // admin courses view
  MC.AdminCoursesView = Backbone.View.extend({

    tagName: 'div',
    idName: 'app',
    template: _.template( $('#adminCoursesTemplate').html() ),

    initialize: function() {

      // caching dom elements
      this.$appMenus = $('#appMenus');

      // caching templates
      this.menuTemplate = _.template( $('#adminMenus').html() );

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
      var view = new MC.AdminCourseView({ model: course});
      $('#adminCourses').append(view.render().$el);
    },

    addAllCoursesViews: function() {
      MC.Courses.each(this.addOneCourseView, this);
    }

  });

  // individual course view
  MC.AdminCourseView = Backbone.View.extend({

    tagName: 'li',
    template: _.template( $('#adminCourseTemplate').html() ),

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

  // form view for creating course
  MC.AdminCourseFormView = Backbone.View.extend({

    tagName: 'div',
    idName: 'app',
    template: _.template( $('#adminCourseForm').html() ),

    events: {
      'click #adminSaveNewCourseButton': 'addCourse'
    },

    initialize: function() {

      // caching dom elements
      this.$appMenus = $('#appMenus');

      // caching templates
      this.menuTemplate = _.template( $('#adminMenus').html() );

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
      var title = $('#adminCourseTitle').val();
      if(!title) {
        this.$el.find('.alert').show();
        return;
      }
      MC.Courses.create({
        title: title
      });
      window.location.href='#/app/admin/courses';
    }

  });

  // individual course page with edit and delete options
  MC.AdminCoursePageView = Backbone.View.extend({

    tagName: 'div',
    idName: 'app',
    template: _.template( $('#adminCoursePageTemplate').html() ),

    events: {
      'click .deleteAdminCourseButton': 'deleteAdminCourse',
      'click .showAdminCourseUpdate': 'updateCourse',
    },

    initialize: function() {

      // model events
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);

    },

    render: function() {
      var html = this.template(this.model.toJSON());
      this.$el.html(html);
      return this;
    },

    updateCourse: function(e) {

      var $formDiv = $('#adminCourseUpdateDiv');
      var $button = $('.showAdminCourseUpdate');

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
      var course = $('#adminCourseUpdate').val();

      if(!course) {
        window.alert('Hey there, we need both start and end dates!\n\nPlease try again.');
        return;
      }

      this.model.set('title', course);
      this.model.save();

      $formDiv
      .hide('fast');
      $button
      .removeClass('btn-success')
      .addClass('btn-info')
      .html('<span class="glyphicon glyphicon-pencil"></span> Edit');

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

    deleteAdminCourse: function() {
      var confirmation = window.confirm('This will remove all students and their updates too.\n\n Are you sure?');
      if(!confirmation) {
        return;
      }
      this.model.destroy();
      window.location.href='#/app/admin/courses';
    }

  });

  // admin students view
  MC.AdminStudentsView = Backbone.View.extend({

    tagName: 'div',
    idName: 'app',
    template: _.template( $('#adminStudentsTemplate').html() ),

    initialize: function() {

      // caching dom elements
      this.$appMenus = $('#appMenus');

      // caching templates
      this.menuTemplate = _.template( $('#adminMenus').html() );

    },

    render: function() {

      // load the menus first
      this.$appMenus.html( this.menuTemplate() );
      this.$appMenus.find('li#studentsLi').addClass('active');

      // draw the main body app
      var html = this.template();
      this.$el.html(html);

      return this;
    },

    addOneStudentView: function(student) {
      var view = new MC.AdminStudentView({ model: student});
      $('#adminStudents').append(view.render().$el);
    },

    addAllStudentsViews: function() {
      MC.Students.each(this.addOneStudentView, this);
    }

  });

  // individual student view
  MC.AdminStudentView = Backbone.View.extend({

    tagName: 'li',
    template: _.template( $('#adminStudentTemplate').html() ),

    initialize: function() {

    },

    render: function() {
      var html = this.template({
        student: this.model
      });
      this.$el.html(html);
      return this;
    }

  });

  // individual student page delete option
  MC.AdminStudentPageView = Backbone.View.extend({

    tagName: 'div',
    idName: 'app',
    template: _.template( $('#adminStudentPageTemplate').html() ),

    events: {
      'click .deleteAdminStudentButton': 'deleteStudent',
      'click .showUpdateLink': 'showStudentCourseUpdates',
      'click .showGitLogsLink': 'showGitLogs'
    },

    initialize: function() {

      // model events
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);

    },

    render: function() {
      var html = this.template(this.model.toJSON());
      this.$el.html(html);
      return this;
    },

    deleteStudent: function() {
      var confirmation = window.confirm('This will remove all their updates too.\n\n Are you sure?');
      if(!confirmation) {
        return;
      }
      this.model.destroy();
      window.location.href='#/app/admin/students';
    },

    showStudentCourses: function() {

      var URL = '/api/student/course/' + this.model.id;
      $.getJSON(URL, function(data){
        var template = _.template( $('#studentCourseInfoForAdmin').html() );
        var html = template({ courses: data });
        $('#studentCourses').html(html);
      });

    },

    showStudentCourseUpdates: function(e) {
      e.preventDefault();
      var ul = $(e.target).parent().find('.courseUpdatesLi');
      $(ul).fadeToggle();
    },

    showStudentProjects: function() {

      var URL = '/api/student/project/' + this.model.id;
      $.getJSON(URL, function(data){
        var template = _.template( $('#studentProjectInfoForAdmin').html() );
        var html = template({ projects: data });
        $('#studentProjects').html(html);
      });

    },

    showGitLogs: function(e) {
      e.preventDefault();
      var urlArr = $(e.target).data('github');
      urlArr = urlArr.split('/');
      var username = urlArr[urlArr.length - 2];
      var repo = urlArr[urlArr.length - 1];
      var apiUrl = 'https://api.github.com/repos/' + username + '/' + repo + '/commits';
      this.gitLogsUl = $(e.target).parent().find('.projectUpdatesLi');
      $(this.gitLogsUl).fadeToggle();
      var self = this;
      $.getJSON(apiUrl, function(data){
        $(self.gitLogsUl).html('');
        for(var i = 0; i < data.length; i += 1) {
          $(self.gitLogsUl).append('<li>' + data[i].commit.message + '</li>');
        }
      });
    }

  });

  // form view for creating student
  MC.AdminStudentFormView = Backbone.View.extend({

    tagName: 'div',
    idName: 'app',
    template: _.template( $('#adminStudentForm').html() ),

    events: {
      'click #adminSaveNewStudentButton': 'addStudent'
    },

    initialize: function() {

      // caching dom elements
      this.$appMenus = $('#appMenus');

      // caching templates
      this.menuTemplate = _.template( $('#adminMenus').html() );

    },

    render: function() {

      // load the menus first
      this.$appMenus.html( this.menuTemplate() );
      this.$appMenus.find('li#studentsLi').addClass('active');

      // draw the main body app
      var html = this.template();
      this.$el.html(html);

      return this;
    },

    addStudent: function(e) {
      e.preventDefault();
      var name = $('#adminStudentName').val();
      var email = $('#adminStudentEmail').val();
      if(!name || !email) {
        this.$el.find('.alert').show();
        return;
      }
      MC.Students.create({
        name: name,
        email: email
      });
      window.location.href='#/app/admin/students';
    }

  });

})();