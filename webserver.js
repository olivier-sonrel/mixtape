var http = require('http').createServer(handler); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module

var io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:8000",
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credendials: true
    },
    allowEIO3: true
});

var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED = new Gpio(26, 'out'); //use GPIO pin 4 as output
var pushButton = new Gpio(17, 'in', 'both'); //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled

const i2c = require('i2c-bus');
const sleep = require('sleep');

const ADS7830 = 0x4b;
const CHANNELS = [0x84, 0xc4, 0x94, 0xd4, 0xa4, 0xe4, 0xb4, 0xf4];
const WAIT = 2;

http.listen(8080); //listen to port 8080

function handler (req, res) { //create server
  fs.readFile(__dirname + '/public/index.html', function(err, data) { //read file index.html in public folder
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
      return res.end("404 Not Found");
    }
    res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
    res.write(data); //write data from index.html
    return res.end();
  });
}
io.on('connection', function (socket) {// WebSocket Connection

  const i2c1 = i2c.openSync(1);
  var dataX=1;
  var dataY = 1;

  setInterval(() => {       
    dataX = (i2c1.readWordSync(ADS7830, CHANNELS[0]) - 5911) / 30;
    dataY = (i2c1.readWordSync(ADS7830, CHANNELS[1]) - 5911) / 60;
    console.log('data X', dataX);
    console.log('data Y', dataY);
    
    var obj = {dataX: dataX, dataY: dataY};
    socket.emit('Curl', obj);
  }, 500);

  i2c1.closeSync();
});
