var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// sử dụng cổng trùng với nodejs
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);

// dùng load file
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});


app.get('/hienthi', function (req, res) {
  res.sendfile(__dirname + '/hienthi.html');
});



io.on('connection', function (socket) { // mỗi socket tương ứng với 1 client mở ứng dụng.
  console.log(socket.id+" is conennect!");
  socket.on('disconnect', function () { // mở phiên lắng nghe bằng on
  console.log(socket.id+" disconnected!");
    
    io.emit('user disconnected');
  });

  socket.emit('conn', 'you connected server!');

  // socket.emit('news', { hello: 'world' });
  // socket.on('sayhello', function (data) {
  //   console.log("asd");
  // });
  socket.on('inputgia', function(data){
    console.log(data);
    // socket.broadcast.emit('updategia', { gia: "data" });
    
    socket.broadcast.emit('update', {coin: 'BTC', price: 9999, perc: -1}); // 1 socket sẽ gửi đi lệnh đến tất cả socket khác.
    
  });

  
});



setInterval(function(){  // cứ 0.5s chạy lại
    var price = Math.floor(Math.random()*1000);
    var perc = 500 - price;
    var items = ['BTC','ETH','XRP', 'BCH', 'ADA', 'NEO'];
    var item = items[Math.floor(Math.random()*items.length)];
    // console.log(item);
    io.sockets.emit('update', {coin: item, price: price, perc: perc});
    // console.log(item);
  },500);

module.exports = app;
