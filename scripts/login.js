function gotFriends(response)
{
  log('loaded friends');
  log(response);
  var data=response.data;
  log(data);
  log(data[0]);
  for(var i=0; i<data.length; i++)
  {
    for(var j=0; j<data[i].length; j++)
    {
      for(var k=0; k<data[i][j].length; k++)
      {
        var friend=data[i][j][k];
        log('friend:');
        log(friend);
      }
    }
  }
}

function loadFriends()
{
  log('loading friends');
  FB.api('/me/friends', gotFriends);
}

function initLogin()
{
  log('initLogin');

  $('#user-info').show();
  $('#logout').show();

  $('#login').hide();

  $('#status').text('Logged in');

  loadFriends();
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
