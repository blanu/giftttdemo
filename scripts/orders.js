var log=function(msg)
{
  if(typeof(console)!=="undefined")
  {
    console.log(msg);
  }
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

var submitForm=function()
{
    log('submitForm()');

    var product=$('#product').attr('href');
    var name=$('#name').val();
    var address1=$('#address1').val();
    var address2=$('#address2').val();
    var city=$('#city').val();
    var state=$('#state').val();
    var zip=$('#zip').val();
    var date=$('#datepicker').val();

    data={'product': product, 'name': name, 'address1': address1, 'address2': address2, 'city': city, 'state': state, 'zip': zip, 'date': date};
    log('data:');
    log(data);

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
