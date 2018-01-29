var mqtt = require('mqtt');
var Topic = '#'; //subscribe to all topics
var Broker_URL = 'mqtt://85.214.126.89';
var Database_URL = 'localhost';

var options = {
	clientId: 'MyMQTT2',
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
    if (err) {console.log(err)}
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
	read_message(a);
		
}

function mqtt_close() {

};

function encender_apagar(opcion){

var request = require('request');
var dataString = opcion;
var options = {
    url: "http://83.213.218.130:8080/rest/items/Enchufe",
    method: 'POST',
    headers: {
        "Content-Type": "text/plain"
    },
    body: dataString
};    
request(options, function (error, response, body) {
	console.log(response.statusCode);
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
});

};
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: Database_URL,
	user: "root",
	password: "toor",
	database: "arduino"
});

connection.connect(function(err) {
	if (err) throw err;
	
});

function read_message(a) {
	var temperatura;
	var horas = [];
	var date = new Date();
	var diasemana = date.getDay();
	var sql = "SELECT dato, tipo FROM configuracion WHERE diaSemana = ?";
	var params = [diasemana];
	sql = mysql.format(sql, params);
	console.log(sql);	
	connection.query(sql, function (error, results) 
	{
		if (error) throw error;
		//console.log(results);
		for(var x=0;x<results.length;x++){
		if(results[x].tipo=="t"){
		//console.log("temperatura");
		temperatura = results[x].dato;
		//console.log(temperatura);
		}else
		{
		horas.push(results[x].dato);
		}
		}

	var horasistema = date.getHours();
  
      if(contains(horas,horasistema) && a < temperatura){
                var opcion="ON";
                encender_apagar(opcion);
        }else { var opcion="OFF";
                encender_apagar(opcion);}
	
	});

};
function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {

        if (a[i] == obj) {	
            return true;
        }
    }
    return false;
}
