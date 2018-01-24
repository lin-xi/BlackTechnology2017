var app = require('express')();
app.set('views', './');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.locals.clients = []

app.get('/', function (req, res) {
  res.render('index');
});

io.on('connection', function (socket) {
  var req = socket.request
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;

  let info =  {
    ip: ip,
    socketId: socket.id
  }
  console.log('join:>>> ', socket.id)
  app.locals.clients.push(info)

  socket.join('rtc');
  io.to('rtc').emit('message', app.locals.clients);

  socket.on('candidate', function(candidate) {
    console.log(candidate)

    for(var i=0; i<app.locals.clients.length; i++) {
      let info = app.locals.clients[i]
      if (info.socketId == socket.id) {
        console.log('add candidate:>>>>', socket.id)
      }
    }
    console.log('server candidate:>>>', candidate)
  })

  socket.on('disconnect', function() {
    console.log('leave:>>> ', socket.id)
    socket.leave('rtc')

    for(var i=0; i<app.locals.clients.length; i++) {
      if (app.locals.clients[i].socketId == socket.id) {
        console.log('remove ', socket.id)
        app.locals.clients.splice(i, 1)
      }
    }

    io.to('rtc').emit('message', app.locals.clients);
  })

});

server.listen(9001);
console.log('Server listen at 9001...')