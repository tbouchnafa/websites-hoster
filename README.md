# Local Webserver 
hosts local websites that have been downloaded

### Example use 
```js

var websites;
var Webserver = require('./index');
var server = new Webserver('./resources/websites', 'localhost', 9900);

server.start(function (error, result) {
    websites = result;
    console.log(JSON.stringify(result, null, 2));
});

```

### Result 

```json
{
  "example.com": "http://localhost:9900/example.com/index.html"
}
```