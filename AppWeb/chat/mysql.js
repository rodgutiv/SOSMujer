var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "mzulma",
  password: "mZulma16$",
  database: "hackton"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO alertas (coordenada, telefono, estado) VALUES (123456, 123456, 'A')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});