var log=function(msg)
{
  if(typeof(console)!=="undefined")
  {
    console.log(msg);
  }
}

var addEmail=function(email)
{
    var li='<li>'+email+'</li>';
    $('#orderList').append(li);
}

var fetchEmails=function()
{
    log('calling jsonp');
    var data=JSON.stringify({'method': 'emails', 'id': '1', 'params': []});
    var url="http://giftttdemo.appspot.com/views?jsonrpc="+encodeURIComponent(data)+'&jsonp=?';
    $.getJSON(url, function(data) {
        log('jsonp success');
        log(data);
        result=data['result'];
        items=JSON.parse(result);
        for(index in items)
        {
            item=items[index];
            log('item: '+item);
            addEmail(item);
        }
    });
}

var initEmails=function()
{
    fetchEmails();
}

$(document).ready(initEmails);
