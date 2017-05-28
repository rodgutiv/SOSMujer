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
  var users = [];
  
  socket.on('send-tel', function(nickname) {
    socket.nickname = nickname;
    users.push(socket.nickname);
    console.log('Se ha Conectado: '+users);
  });
  
  socket.on('mapa', function(tel) {
    con.query("SELECT u.nombre, u.domicilio, u.telefonof, a.* FROM users AS u INNER JOIN alertas AS a ON u.telefono = a.telefono WHERE u.telefono = ? AND DATE(a.fecha_hora) = CURDATE()  ORDER BY a.fecha_hora DESC",[tel], function (err, result) {
    if (err) throw err;
    console.log(result[1]);
  });
  });
  
  socket.on('disconnect', function(){
    console.log('Desconectado');
  });
  
  socket.on('chat message', function(msg){
	
	if(parseInt(msg.al) == 1){
		var datos = msg.info.split("@");
		con.query("INSERT INTO alertas (coordenada, telefono, estado) VALUES (?, ?,?)", [datos[2], datos[0], 'A'],
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



  
