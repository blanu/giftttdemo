function initLogin()
{
  log('initLogin');

  $('#user-info').show();
  $('#logout').show();

  $('#login').hide();

  $('#status').text('Logged in');
}

function initLogout()
{
  log('initLogout');

  $('#login').show();

  $('#user-info').hide();
  $('#logout').hide();

  $('#status').text('Logged out');
}

function logout()
{
  FB.logout(function(response) {
    log('Logged out');
  });
}

function login()
{
  log('login');
  FB.Event.subscribe('auth.login', function(response) {
    log('auth.login');
    log(response);
  });

  FB.Event.subscribe('auth.logout', function(response) {
    log('auth.logout');
    log(response);
  });

  FB.Event.subscribe('auth.authResponseChange', function(response) {
    log('auth.authResponseChange');
    log(response);
  });

  FB.Event.subscribe('auth.statusChange', function(response) {
    log('auth.statusChange');
    log(response);
    if(response.status=="connected")
    {
      initLogin();
    }
    else
    {
      initLogout();
    }
  });
}
