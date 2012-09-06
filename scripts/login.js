function scrubDate(date)
{
  return date.split(',')[0];
}

function gotFriends(response)
{
  log('loaded friends');
  log(response);
  for(var i=0; i<response.length; i++)
  {
    var friend=response[i];
    
    var instance=$('#peopleTemplate').clone();
    instance.attr('id', friend.name);
    instance.find('.name').text(friend.name);

    if(friend.birthday!=null)
    {
      instance.find('.holidayItem .itemText').first().text(scrubDate(friend.birthday));
    }

    $('#friends').append(instance);
  }
  
  $('.holidaysHeader .addButton').click(addHolidayButtonClicked);
  $('.giftsHeader .addButton').click(addGiftButtonClicked);
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

  $('#main').show();

  loadFriends();
}

function initLogout()
{
  log('initLogout');

  $('#main').hide();
}

function logout()
{
  FB.logout(function(response) {
    log('Logged out');
  });
}

function moreFriendsClicked()
{
  log('moreFriendsClicked');
  $('#moreFriends').show();
}

function itemInputKeyPressed(event)
{
  if(event.keyCode==13) // Pressed Enter.
  {
      var value=$(this).val();
      log('value:');
      log(value);
      var parent=$(this).parents().first();
      parent.empty();
      var item='<div class="text2 holidayItem"><div class="itemText">'+value+'</div></div>';
      parent.append(item);
  }  
}

function addHolidayButtonClicked()
{
  log('addButtonClicked');
  log('this');
  log(this);
  log('itemTemplate');
  log(itemTemplate);
  if($(this).parents().first().next().find('.itemTemplate').length>0)
  {
    var itemTemplate=$(this).parents().first().next().find('.itemTemplate').first();
    var templateContainer=$(itemTemplate).parents().first();
    log(templateContainer);
    $(templateContainer).empty();
    var html='<input type="text" class="itemInput"/>';
    $(templateContainer).append(html);
    $('.itemInput').keypress(itemInputKeyPressed);
  }
  else
  {
    log('no item template');
    var itemTemplate=$(this).parents().first().next().find('.holidayItem').first();
    var templateContainer=$(itemTemplate).parents().first();
    log(templateContainer);
    var html='<div class="text2 holidayItem"><input type="text" class="itemInput"/></div>';
    $(templateContainer).append(html);
    $('.itemInput').keypress(itemInputKeyPressed);
  }
}

function addGiftButtonClicked()
{
  log('addButtonClicked');
  log('this');
  log(this);
  log('itemTemplate');
  log(itemTemplate);
  if($(this).parents().first().next().find('.itemTemplate').length>0)
  {
    var itemTemplate=$(this).parents().first().next().find('.itemTemplate').first();
    var templateContainer=$(itemTemplate).parents().first();
    log(templateContainer);
    $(templateContainer).empty();
    var html='<input type="text" class="itemInput"/>';
    $(templateContainer).append(html);
    $('.itemInput').keypress(itemInputKeyPressed);
  }
  else
  {
    log('no item template');
    var itemTemplate=$(this).parents().first().next().find('.giftItem').first();
    var templateContainer=$(itemTemplate).parents().first();
    log(templateContainer);
    var html='<div class="text2 giftItem"><input type="text" class="itemInput"/></div>';
    $(templateContainer).append(html);
    $('.itemInput').keypress(itemInputKeyPressed);
  }
}

function login()
{
  log('login');

  $('#moreFriendsButton').click(moreFriendsClicked);

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
