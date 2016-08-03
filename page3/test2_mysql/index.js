var express = require('express');
var path = require('path');
var ejs = require('ejs');
var url = require("url");
var querystring = require("querystring");
var mysql = require('mysql');

var app = express();

//static file
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.engine('html',ejs.__express);
app.set("view engine","html"); 

//get mysql database connection
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123321',
	database:'case'
});

//connect the database
connection.connect();

//home
app.get('/', function (req, res) {
	res.render('index');

});


//query all the workouts
app.get('/queryAll', function (req, res) {
	//query
	connection.query("SELECT id,name,reps,weight,date_format(date, '%Y-%m-%d %H:%m:%S') as date,lbs from workouts", function(err, rows, fields) {
		if (err) throw err;
		res.writeHead(200, {'Content-Type': 'application/json'});
  		res.end(JSON.stringify(rows));
	});

});

//delete the workout by id
app.get('/del', function (req, res) {	

	var params = url.parse(req.url, true).query;
	var sql = 'delete from workouts where id=?';
	var p = [];
	p.push(params.id)
	
	//delete
	connection.query(sql, p , function(err, rows, fields) {
		if (err) throw err;
		res.end('ok');
	});
	
});

//add workout into db
app.get('/addWorkout', function(req, res){
	var params = url.parse(req.url, true).query;
	var sql = "insert into workouts(name,reps,weight,date,lbs) values(?,?,?,now(),?)";
	var p = [];
	p.push(params.name);
	p.push(params.reps);
	p.push(params.weight);
	p.push(params.lbs);
	//insert
	connection.query(sql, p , function(err, rows, fields) {
		if (err){
			res.end('error');	
		}else{
			res.end('ok');
		}
	});
});

//query workout by id for update
app.get('/queryById', function(req, res){
	var params = url.parse(req.url, true).query;
	var sql = "select * from workouts where id=?";
	var p = [];
	p.push(params.id);
	//query
	connection.query(sql, p , function(err, rows, fields) {
		if (err) throw err;
		res.render('update',{data:rows});
	});
});

//update workout by id
app.get('/update', function(req, res){
	var params = url.parse(req.url, true).query;
	var sql = "update workouts set name=?,reps=?,weight=?,lbs=? where id=?";
	var p = [];
	p.push(params.name);
	p.push(params.reps);
	p.push(params.weight);
	p.push(params.lbs);
	p.push(params.id);
	//update
	connection.query(sql, p , function(err, rows, fields) {
		if (err) throw err;
		res.end('ok');
	});
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('app listening at http://%s:%s', host, port);
});
