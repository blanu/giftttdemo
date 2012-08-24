function gotFriends(response)
{
  log('loaded friends');
  log(response);
  for(var i=0; i<response.length; i++)
  {
    var friend=response[i];
    log('friend:');
    log(friend);

    if(friend.birthday!=null)
    {
      var item='<li>'+friend.name+' '+friend.birthday+'</li>';
    }
    else
    {
      var item='<li>'+friend.name+'</li>';
    }

    $('#friends').append(item);
  }
}

function loadFriends()
{
  log('loading friends');
//  FB.api('/me/friends', gotFriends);
  FB.api('/me', function(response)
  {
    log('got me');
    var query = FB.Data.query('SELECT uid,name,birthday FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1='+response.id+')');
    query.wait(gotFriends);
  });
}

function initLogin()
{
  log('initLogin');

  $('#user-info').show();
  $('#logout').show();
  $('#friends').show();

//  $('#login').hide();

  $('#status').text('Logged in');

  loadFriends();
}

function initLogout()
{
  log('initLogout');

  $('#login').show();

  $('#user-info').hide();
  $('#logout').hide();
  $('#friends').hide();

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
