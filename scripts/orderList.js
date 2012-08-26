var log=function(msg)
{
  if(typeof(console)!=="undefined")
  {
    console.log(msg);
  }
}

var addOrder=function(date, name, product)
{
    var li='<li>'+date+' '+name+' '+'<a href="'+product+'">link</a></li>';
    $('#orderList').append(li);
}

var fetchOrderList=function()
{
    log('calling jsonp');
    var data=JSON.stringify({'method': 'orderList', 'id': '1', 'params': []});
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
            addOrder(item['date'], item['address']['name'], item['product']);
        }
    });
}

var initOrderList=function()
{
    fetchOrderList();
}

$(document).ready(initOrderList);
