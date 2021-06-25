var http = require('http').createServer(handler); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module
//var io = require('socket.io')(http) //require socket.io module and pass the http object (server)

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
//io.sockets.on('connection', function (socket) {// WebSocket Connection
  // var lightvalue = 0; //static variable for current status
  // pushButton.watch(function (err, value) { //Watch for hardware interrupts on pushButton
  //   if (err) { //if an error
  //     console.error('There was an error', err); //output error message to console
  //     return;
  //   }
  //   lightvalue = value;
  //   console.log('V',value);
  //   socket.emit('light', lightvalue); //send button status to client
  // });

  // socket.on('light', function(data) { //get light switch status from client
  //   lightvalue = data;
  //   if (lightvalue != LED.readSync()) { //only change LED if status has changed
  //     LED.writeSync(lightvalue); //turn LED on or off
  //   }
  // });

// var xx = function(cb) {
	
//	return cb(null,1000);
//}
//var xx = 'toto';
//socket.emit('CurlX', {message: xx});
//  socket.emit('CurlX', xx); //{ //get light switch status from client
   // const i2c1 = i2c.openSync(1);
    //while(true){
           // dataX = 1000; //(i2c1.readWordSync(ADS7830, CHANNELS[0])-5911)/30;
           // console.log('data X', dataX);
           // sleep.sleep(WAIT);
    //}
    //i2c1.closeSync();
 // });
  //var dataX = 100;
//var dataX = 0;

      const i2c1 = i2c.openSync(1);

    var dataX=1;
var dataY = 1;
   // while (dataX > 0 || dataY > 0) {
        //sleep.sleep(1);
//	dataX = (i2c1.readWordSync(ADS7830, CHANNELS[0]) - 5911) / 30;
 //       dataY = (i2c1.readWordSync(ADS7830, CHANNELS[1]) - 5911) / 60;
//console.log('data X', dataX);
  //      console.log('data Y', dataY);

	setInterval(() => {       
    dataX = (i2c1.readWordSync(ADS7830, CHANNELS[0]) - 5911) / 30;
        dataY = (i2c1.readWordSync(ADS7830, CHANNELS[1]) - 5911) / 60;
console.log('data X', dataX);
        console.log('data Y', dataY);
	
	
	var obj = {dataX: dataX, dataY: dataY};
        //socket.emit('CurlY', dataY);
        //socket.emit('CurlX', dataX);
        socket.emit('Curl', obj);
 	}, 500);
   // }

// var dataY = 1;
  //  while (dataY > 0) {
       // dataY = (i2c1.readWordSync(ADS7830, CHANNELS[1]) - 5911) / 60;
       // console.log('data Y', dataY);
       // socket.emit('CurlY', dataY);
       // sleep.sleep(WAIT);
   // }
    i2c1.closeSync();
//  while(true) {
//if (dataX != (i2c1.readWordSync(ADS7830, CHANNELS[0])-5911)/30) {
            // dataX = (i2c1.readWordSync(ADS7830, CHANNELS[0])-5911)/30;
          //   console.log('data X', dataX);
            // sleep.sleep(WAIT);
//socket.emit('CurlX', dataX);
//	return dataX;
//   }
   // i2c1.closeSync(0);
//console.log('data X', dataX);
 // socket.emit('CurlX', dataX) //{ //get light switch status from client
    //var i2c1;
    //i2c1 = i2c.openSync(0);
    // while(true) {
            // dataX = (i2c1.readWordSync(ADS7830, CHANNELS[0])-5911)/30;
//return dataX = 100;
    //         console.log('data X', dataX);
    //         sleep.sleep(WAIT);
    // }
   // i2c1.closeSync(0);
 // });

    //TODO
    //     socket.on('CurlY', function(y) { //get light switch status from client
    //         valueY = y;

    //         //TO CLEAN
    //         const i2c1 = i2c.openSync(1);
    //         while (true) {

    //             var dataY = (i2c1.readWordSync(ADS7830, CHANNELS[1]) - 5911) / 60;

    //             console.log('data Y', dataY);
    //             sleep.sleep(WAIT);
    //         }
    //         i2c1.closeSync();
    //         //endTO CLEAN

    //         if (lightvalue != LED.readSync()) { //only change LED if status has changed
    //             LED.writeSync(lightvalue); //turn LED on or off
    //         }
    //     });
    // });

    // process.on('SIGINT', function() { //on ctrl+c
    //     LED.writeSync(0); // Turn LED off
    //     LED.unexport(); // Unexport LED GPIO to free resources
    //     pushButton.unexport(); // Unexport Button GPIO to free resources
    //     process.exit(); //exit completely
});
  
