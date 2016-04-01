# Local Webserver 
hosts local websites that have been downloaded

### Example use 
``javascript 

var websites;
var Webserver = require('./index');
var server = new Webserver('./resources/websites', 'localhost', 9900);

server.start(function (error, result) {
    websites = result;
    console.log(JSON.stringify(result, null, 2));
});

``

### Result 

``javascript
{
    "cassing.de": "http://localhost:9900/cassing.de/index.html"
}
``