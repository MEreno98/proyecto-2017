var mqtt = require('mqtt');
var Topic = '#'; //subscribe to all topics
var Broker_URL = 'mqtt://85.214.126.89';
var Database_URL = 'localhost';

var options = {
	clientId: 'MyMQTT',
	port: 1883,
	//username: 'mqtt_user',
	//password: 'mqtt_password',	
	keepalive : 60
};

var client  = mqtt.connect(Broker_URL, options);
client.on('connect', mqtt_connect);
client.on('reconnect', mqtt_reconnect);
client.on('error', mqtt_error);
client.on('message', mqtt_messsageReceived);
client.on('close', mqtt_close);

function mqtt_connect() {
    //console.log("Connecting MQTT");
    client.subscribe(Topic, mqtt_subscribe);
}

function mqtt_subscribe(err, granted) {
    console.log("Subscribed to " + Topic);
    if (err) {console.log(err);}
}

function mqtt_reconnect(err) {
    //console.log("Reconnect MQTT");
    //if (err) {console.log(err);}
	client  = mqtt.connect(Broker_URL, options);
}

function mqtt_error(err) {
    //console.log("Error!");
	//if (err) {console.log(err);}
}

function after_publish() {
	//do nothing
}

function mqtt_messsageReceived(a,b) {
	c=JSON.parse(b);

	var a = c.temp;
	var b = c.hum;

	//console.log(c);
	insert_message(a, b);
}

function mqtt_close() {
	//console.log("Close MQTT");
}

////////////////////////////////////////////////////
///////////////////// MYSQL ////////////////////////
////////////////////////////////////////////////////
var mysql = require('mysql');

//Create Connection
var connection = mysql.createConnection({
	host: Database_URL,
	user: "root",
	password: "toor",
	database: "arduino"
});

connection.connect(function(err) {
	if (err) throw err;
	//console.log("Database Connected!");
});

//insert a row into the tbl_messages table
function insert_message(a, b) {
	var clientID= "client001";
	var sql = "INSERt INTO ?? (??,??,??) VALUES (?,?,SYSDATE())";
	var params = ['mediciones','temperatura', 'humedad', 'fecha', a, b];
	sql = mysql.format(sql, params);
	console.log(sql);	
	connection.query(sql, function (error, results) {
		if (error) throw error;
		console.log("1 record inserted");
	});
	connection.commit();
};		
