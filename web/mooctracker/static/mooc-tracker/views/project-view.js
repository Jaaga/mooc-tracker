// global backbone app
var app = app || {};

(function(){
  'use strict';

  app.ProjectView = Backbone.View.extend({

    tagName: 'li',
    template: _.template( $('#projectTemplate').html() ),

    events: {
      'click .projectDeleteButton': 'deleteProject',
      'click .showGithubInfo': 'showGithubInfo'
    },

    initialize: function() {
      // cache dom elements

      // cache templates
      this.githubInfoTemplate = _.template( $('#githubInfoTemplate').html() );

      // listen to model events
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      var html = this.template(
        this.model.toJSON()
      );
      this.$el.html(html);
      return this;
    },

    deleteProject: function(e) {
      e.preventDefault();
      var confirmation = confirm('Are you sure?');
      if(!confirmation) {
        return;
      }
      this.model.destroy();
    },

    showGithubInfo: function(e) {
      e.preventDefault();
      var githubInfo = this.$el.find('.githubInfo');
      githubInfo.fadeToggle();
      this.fetchGithubInfo(this.model.get('githubUrl'), githubInfo);
    },

    fetchGithubInfo: function(githubUrl, element) {

      // to be used with AJAX callbacks later
      var that = this;
      
      // helper function to split github url in to username, repo
      function splitGithubUrl(url) {
        var arr = url.split('/');
        return {
          'user': arr[arr.length - 2 ],
          'repo': arr[arr.length - 1]
        }
      }

      var githubInfo = splitGithubUrl(githubUrl);
      var apiUrl = 'https://api.github.com/repos/' + githubInfo.user + '/' + githubInfo.repo;
      var projectInfo = {};
      $.getJSON(apiUrl).done(function(data){
        projectInfo.created_at = data.created_at;
        projectInfo.updated_at = data.updated_at;
        projectInfo.language = data.language;
        projectInfo.size = data.size / 1024;
        // now get the commits log
        $.getJSON(apiUrl + '/commits').done(function(data){
          projectInfo.commits = [];
          for(var i = 0; i < 7; i+= 1) {
            projectInfo.commits.push({
              message: data[i].commit.message,
              date: data[i].commit.committer.date
            });
          }

          // finally update the html
          var html = that.githubInfoTemplate({
            github: projectInfo
          });
          that.$el.find('.githubInfo').html(html);

        });
      });

    }

  });

})();