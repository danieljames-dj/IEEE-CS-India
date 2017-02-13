var express = require('express');
var app = express();
var bodyparser = require('body-parser');
app.use(express.static('public'));
app.use(bodyparser.json());
var mysql = require("mysql");
var jwt = require('jsonwebtoken');
app.set('superSecret', 'tkmce87');
var con = mysql.createConnection({
  host: "localhost",
  user: "dany",
  password: "emmaus",
  database: "node"
});
con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Database Connection established');
});
app.post('/search',function(req, res) {
	var statement = "select * from chapters where members >= " + req.body.min + " and members <= " + req.body.max;
	if (req.body.section != "Any Section" )
		statement += " and section = \"" + req.body.section + "\"";
	if (req.body.state != "Any State" )
		statement += " and state = \"" + req.body.state + "\"";
	con.query(statement, function(err, rows) {
		console.log(rows);
		for (var i = 0; i < rows.length; i++) {
			if (rows[i].name.indexOf(req.body.name)==-1) {
				rows.splice(i,1);
				i--;
			}
		}
		res.json(rows);
	});
})
app.listen(8080, function() {
	console.log("Server listening to port 8080");
});
