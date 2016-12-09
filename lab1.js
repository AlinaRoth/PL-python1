var request = require('request');
var address = 'http://www.csd.tsu.ru';

var VisUrl=[];
var Emails=[];
var EmailsAmount = 0;

var emailRegex = /\b[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+/ig;
var linkRegex = /<a href=\"(\/[-+\w:\/#@$.]*)/ig;
var limitDeep = 10;

start(address, 0);

function start(url, iter)
{
	iter=iter+1;
    request(url, function (err,res,body) 
    {
        if (err) {
           //throw err;
        }
        else {
            var pageEmails=body.match(emailRegex);
            if(typeof(pageEmails)!=null) {
                pageEmails=getOnly(pageEmails);
            }
            if(pageEmails) {
                for (i = 0; i < pageEmails.length; i++) {
                    if (Emails.indexOf(pageEmails[i]) == -1) {
                        Emails.push(pageEmails[i]);
                    }
                }
            }

            links=body.match(linkRegex);
            if (typeof(links) != null && links) {
                links=getOnly(links);
                for(i=0; i<links.length; i++)
                {
                    if (VisUrl.indexOf(links[i]) == -1 && iter<limitDeep) {
                        page=links[i].split('href="')[1];
                        start(address + page, iter);
                        VisUrl.push(links[i]);
                        //console.log("VisUrl: " + links[i]);
                    }
                }   
            }
        }
        
        if (EmailsAmount < Emails.length) 
        {
            console.log("Теперь надено " + Emails.length + ": " + Emails + "\n ---------");
            EmailsAmount = Emails.length;
        }
    });

    
}

function getOnly(e) {
  var result = [];
  if (typeof e != 'undefined') {
    for (i = 0; i < e.length; i++){
      if (result.indexOf(e[i]) == -1) {
          result.push(e[i])
      }
    }
  }

  return result;
}