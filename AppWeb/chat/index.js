var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hackton"
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  
  socket.on('chat message', function(msg){
	
	if(parseInt(msg.al) == 1){
		con.query("INSERT INTO alertas (coordenada, telefono, estado) VALUES (?, ?,?)", [1, 1, 'A'],
		function(err, lastId){
			msg['id'] = lastId.insertId;
		});
	}
	io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});



  
