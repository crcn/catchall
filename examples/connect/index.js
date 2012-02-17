var catchall = require('../../'),
connect = require('connect'),
app = connect.createServer();
app.use(catchall.connectMiddleware);
app.use(connect.static(__dirname + '/public'));
app.listen(8080);