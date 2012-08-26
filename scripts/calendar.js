var log=function(msg)
{
  if(typeof(console)!=="undefined")
  {
    console.log(msg);
  }
}

var action=function(url, method, params)
{
    var id='1';
    var jsonrpc={'method': method, 'params': params, 'id': id};

    $.ajax({
        type: 'POST',
        url: url,
        crossDomain: true,
        data: JSON.stringify(jsonrpc),
        dataType: 'json',
        success: function(responseData, textStatus, jqXHR)
        {
            log('success');
        },
        error: function (responseData, textStatus, errorThrown)
        {
            log('failure');
        }
    });
}

var jsonp=function(url, callback)
{
    var z = document.createElement('script');
    z.src = url+'?jsonp='+callback;
    z.type = 'text/javascript';
    void(document.body.appendChild(z));
}

var jsonpRpc=function(url, method, params, id, callback)
{
    data={'method': method, 'params': params, 'id': id};
}

function parseUri (str) {
    var o   = parseUri.options,
        m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
        uri = {},
        i   = 14;

    while (i--) uri[o.key[i]] = m[i] || "";

    uri[o.q.name] = {};
    uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
        if ($1) uri[o.q.name][$1] = $2;
    });

    return uri;
};

parseUri.options = {
    strictMode: false,
    key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
    q:   {
        name:   "queryKey",
        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
};

var redirectToThanks=function()
{
  window.location='thanks.html';
}

var submitForm=function()
{
    log('submitForm()');

    var product=$('#product').attr('href');
    var date=$('#datepicker').val();

    var fields=['name', 'address1', 'address2', 'city', 'state', 'zip'];
    address={}
    for(index in fields)
    {
        var field=fields[index];
        var value=$('#'+field).val();
        if(value!='')
        {
            address[field]=value;
        }
    }

    log('address:');
    log(address);

    action('http://giftttdemo.appspot.com/actions', 'order', [product, address, date]);

    redirectToThanks();

    return false;
}

var initCalendar=function()
{
    uri=parseUri(location.href);
    product=decodeURIComponent(uri['queryKey']['product']);
    log('product: '+product);

    $('#product').attr('href', product);
    $("#datepicker").datepicker();

    $('#submit').click(submitForm);
}

$(document).ready(initCalendar);
