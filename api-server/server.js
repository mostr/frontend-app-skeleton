var express = require('express');
var app = express();

app.get('/api/hello', function(req, res){
  res.json({hello: 'world'});
});

app.listen(8888);