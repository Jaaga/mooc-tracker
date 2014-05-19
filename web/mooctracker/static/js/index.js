(function(){
  'use strict';

  $('#createAccountLink').on('click', function(e){
    e.preventDefault();
    $('#loginForm').hide();
    $('#signupForm').fadeIn();
  });

  $('#signinLink').on('click', function(e){
    e.preventDefault();
    $('#signupForm').hide();
    $('#loginForm').fadeIn();
  });

})();