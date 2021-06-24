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

//FROM app----------------------------
const appContents = document.querySelector('.app-contents');
const startMessage = document.querySelector('.start-message');
let isAppInit = false;
appContents.style.display = 'none';

window.addEventListener('keydown', init);
window.addEventListener('click', init);

function init() {
  if (isAppInit) {
    return;
  }

  appContents.style.display = 'block';
  document.body.removeChild(startMessage);

  // create web audio api context
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioContext();

  // create Oscillator and gain node
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  // connect oscillator to gain node to speakers
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  // create initial theremin frequency and volume values
  const WIDTH = window.innerWidth;
  const HEIGHT = window.innerHeight;

  const maxFreq = 6000;
  const maxVol = 0.02;
  const initialVol = 0.001;


  // set options for the oscillator
  oscillator.detune.value = 100; // value in cents
  oscillator.start(0);

  oscillator.onended = function() {
    console.log('Your tone has now stopped playing!');
  };

  gainNode.gain.value = initialVol;
  gainNode.gain.minValue = initialVol;
  gainNode.gain.maxValue = initialVol;

  // Mouse pointer coordinates
  let CurX;
  let CurY;

  // Get new mouse pointer coordinates when mouse is moved
  // then set new gain and pitch values
  document.onmousemove = updatePage;

  function updatePage(e) {
      KeyFlag = false;

      // CHANGE VALUE X Y HERE
      CurX = e.pageX;
      CurY = e.pageY;
      //CurX = (rawData1-5911)/30;
      //CurY = (rawData2-5911)/60;

      console.log(CurX, CurY);

      oscillator.frequency.value = (CurX/WIDTH) * maxFreq;
      gainNode.gain.value = (CurY/HEIGHT) * maxVol;

      canvasDraw();
  }

  // mute button
  const mute = document.querySelector('.mute');

  mute.onclick = function() {
    if (mute.getAttribute('data-muted') === 'false') {
      gainNode.disconnect(audioCtx.destination);
      mute.setAttribute('data-muted', 'true');
      mute.innerHTML = "Unmute";
    } else {
      gainNode.connect(audioCtx.destination);
      mute.setAttribute('data-muted', 'false');
      mute.innerHTML = "Mute";
    };
  }

  // canvas visualization
  function random(number1,number2) {
    return number1 + (Math.floor(Math.random() * (number2 - number1)) + 1);
  }

  const canvas = document.querySelector('.canvas');
  const canvasCtx = canvas.getContext('2d');

  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  function canvasDraw() {
    if (KeyFlag) {
      rX = KeyX;
      rY = KeyY;
    } else {
      rX = CurX;
      rY = CurY;
    }

    rC = Math.floor((gainNode.gain.value/maxVol)*30);

    canvasCtx.globalAlpha = 0.2;

    for (let i = 1; i <= 15; i = i+2) {
      canvasCtx.beginPath();
      canvasCtx.fillStyle = 'rgb(' + 100+(i*10) + ',' + Math.floor((gainNode.gain.value/maxVol)*255) + ',' + Math.floor((oscillator.frequency.value/maxFreq)*255) + ')';
      canvasCtx.arc(rX+random(0,50),rY+random(0,50),rC/2+i,(Math.PI/180)*0,(Math.PI/180)*360,false);
      canvasCtx.fill();
      canvasCtx.closePath();
    }
  }

  // clear screen
  const clear = document.querySelector('.clear');

  clear.onclick = function() {
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // keyboard controls
  const body = document.querySelector('body');

  let KeyX = 1;
  let KeyY = 0.01;
  let KeyFlag = false;

  const ARROW_LEFT = 'ArrowLeft';
  const ARROW_RIGHT = 'ArrowRight';
  const ARROW_UP = 'ArrowUp';
  const ARROW_DOWN = 'ArrowDown';

  body.onkeydown = function(e) {
    KeyFlag = true;

    if (e.code === ARROW_LEFT) {
      KeyX -= 20;
    }

    if (e.code === ARROW_RIGHT) {
      KeyX += 20;
    }

    if (e.code === ARROW_UP) {
      KeyY -= 20;
    }

    if (e.code === ARROW_DOWN) {
      KeyY += 20;
    }

    // set max and min constraints for KeyX and KeyY
    if (KeyX < 1) {
      KeyX = 1;
    }

    if (KeyX > WIDTH) {
      KeyX = WIDTH;
    }

    if (KeyY < 0.01) {
      KeyY = 0.01;
    }

    if (KeyY > HEIGHT) {
      KeyY = HEIGHT;
    }

    oscillator.frequency.value = (KeyX/WIDTH) * maxFreq;
    gainNode.gain.value = (KeyY/HEIGHT) * maxVol;

    canvasDraw();
  };

  isAppInit = true;
}


//END FROM app----------------------------
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

io.sockets.on('connection', function (socket) {// WebSocket Connection
    var lightvalue = 0; //static variable for current status
    pushButton.watch(function (err, value) { //Watch for hardware interrupts on pushButton
      if (err) { //if an error
        console.error('There was an error', err); //output error message to console
        return;
      }
      lightvalue = value;
      console.log('V',value);
      socket.emit('light', lightvalue); //send button status to client
    });
    socket.on('light', function(data) { //get light switch status from client
      lightvalue = data;
      if (lightvalue != LED.readSync()) { //only change LED if status has changed
        LED.writeSync(lightvalue); //turn LED on or off
      }
    });
  });
  
  process.on('SIGINT', function () { //on ctrl+c
    LED.writeSync(0); // Turn LED off
    LED.unexport(); // Unexport LED GPIO to free resources
    pushButton.unexport(); // Unexport Button GPIO to free resources
    process.exit(); //exit completely
  });
  