var express = require('express');

var app = express();
app.set('view engine', 'ejs');
const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(bodyparser.json());

var routes = require('./routes/router');
app.use('/', routes);
app.use(express.static(__dirname + '/public'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
module.exports = app;