function initLogin()
{
  log('initLogin');

  $('#user-info').show('slow');
  $('#loginDiv').hide('slow');
  $('#tabs').show('slow');
  $('#people').show('slow');
  $('#bookmark').show('slow');
  $('#like').show('slow');
  $('#invite').show('slow');

  FB.api(
    {
      method: 'fql.query',
      query: 'SELECT name, pic FROM profile WHERE id=' + FB.getSession().uid
    },
    function(response) {
      var user = response[0];
     $('#user-info').html('<img class="icon" src="' + user.pic + '">' + user.name).show('slow');
    }
  );

  refresh();
}

function initLogout()
{
  log('initLogout');

  $('#user-info').hide('slow');
  $('#logoutDiv').hide('slow');
  $('#loginDiv').show('slow');
  $('#update').hide('slow');
  $('#flares').hide('slow');
  $('#tabs').hide('slow');
  $('#people').hide('slow');
  $('#bookmark').hide('slow');
  $('#like').hide('slow');
  $('#invite').hide('slow');
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
      initLogout();
    }
    else
    {
      initLogin();
    }
  });
}
