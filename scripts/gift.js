var log=function(msg)
{
  if(typeof(console)!=="undefined")
  {
    console.log(msg);
  }
}

var storeProduct=function(url)
{
  log('storeProduct('+url+')');
}

var redirectToCalendar=function(url)
{
  log('redirectToCalendar()');
  window.location='http://blanu.net/gifttt/calendar.html?product='+encodeURIComponent(url);
}

var initGifttt=function()
{
  log('init');
  storeProduct(location.href);
  redirectToCalendar(location.href);
}

$(document).ready(initGifttt);
