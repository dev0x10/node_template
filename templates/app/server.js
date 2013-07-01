//setup Dependencies
var express = require('express')
  , io = require('socket.io')
  , http = require('http')
  , port = (process.env.PORT || 8081);

//Setup Express
var app = express();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view options', { layout: false });
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret: "shhhhhhhhh!"}));
  app.use(express.static(__dirname, + '/public'));
  app.use(app.router);
  app.use(function(err, req, res, next){
    res.render('404', {title: "Sorry, page not found"});
  });
});
var server = http.createServer(app);

server.listen(port);

//Setup Socket.IO
var io = io.listen(server);
io.sockets.on('connection', function(socket){
  console.log('Client Connected');
  socket.on('message', function(data){
    socket.broadcast.emit('server_message',data);
    socket.emit('server_message',data);
  });
  socket.on('disconnect', function(){
    console.log('Client Disconnected.');
  });
});


//  # ROUTES #

app.get('/', function(req,res){
  res.render('index');
});

//A Route for Creating a 500 Error (Useful to keep around)
app.get('/500', function(req, res){
  res.render('500', {title: "Internal server error!"});
});

////The 404 Route (ALWAYS Keep this as the last route)
app.get('/*', function(req, res){
  throw new NotFound;
});

function NotFound(msg){
  this.name = 'NotFound';
  Error.call(this, msg);
  Error.captureStackTrace(this, arguments.callee);
}

console.log('Server listening on: http://localhost:' + port );
