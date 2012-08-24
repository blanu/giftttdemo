function initLogin()
{
  log('initLogin');

  $('#user-info').show('slow');
  $('#logout').show('slow');

  $('#login').hide('slow');

  $('#status').text('Logged in');
}

function initLogout()
{
  log('initLogout');

  $('#login').show('slow');

  $('#user-info').hide('slow');
  $('#logout').hide('slow');

  $('#status').text('Logged out');
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
