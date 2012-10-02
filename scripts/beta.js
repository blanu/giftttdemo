var log=function(msg)
{
  if(typeof(console)!=="undefined")
  {
    console.log(msg);
  }
}

var validateEmail=function(email)
{ 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
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

var redirectToThanks=function(url)
{
  window.location='thanks.html';
}

var postSuccess=function()
{
  redirectToThanks();
}

var post=function(url, data, successCallback)
{
    log('posting: '+data);
    $.ajax({
        type: 'POST',
        url: url,
        crossDomain: true,
        data: data,
        dataType: 'json',
        success: successCallback,
        error: function (responseData, textStatus, errorThrown) {
            log('post failure');
        }
    });
}

var jamesProtection=function(s)
{
    if(s.indexOf('"')!=-1)
    {
        return true;
    }
    else if(s.indexOf("'")!=-1)
    {
        return true;
    }
    else if(s.indexOf('<')!=-1)
    {
        return true;
    }
    else if(s.indexOf('>')!=-1)
    {
        return true;
    }
    else if(s.indexOf('%')!=-1)
    {
        return true;
    }
    else if(s.indexOf('\\')!=-1)
    {
        return true;
    }
    else if(s.indexOf('&')!=-1)
    {
        return true;
    }
    
    return false;
}

var submitForm=function()
{
    log('submitForm()');

    var email=$('#emailInput').val();

    if(email==null || email=="")
    {
        return false;
    }

    if(!validateEmail(email))
    {
      $('#emailInput').val('');
      return false;
    }
    
    if(jamesProtection(email))
    {
      $('#emailInput').val('');
      return false;
    }

    var data=JSON.stringify({'method': 'submitEmail', 'id': '1', 'params': [email]});

    post('http://giftttdemo.appspot.com/actions', data, postSuccess)

    return false;
}

var initBeta=function()
{
    $('#submit').click(submitForm);
}

$(document).ready(initBeta);
