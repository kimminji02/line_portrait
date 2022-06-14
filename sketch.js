var video;
var vScale = 8
var c;
var x1, x2, x3, y1, y2, y3;
var curvePointX = 0;
var curvePointY = 0;
var counter;
var maxCounter = 10000;
var streamReady = false;


var subX = 0;
var subY = 0;
var nDots = 100;
var dotXstart = 320; 
var dotYstart = 240;
var rndMin = -10; 
var rndMax = 10;
var vScale = 2;
var maxBrushSize = 3; 
var minBrushSize = 0;


function setup() {
  createCanvas(640, 480);
  background(255);
  video = createCapture(VIDEO, function() {
    streamReady = true;
  });
  video.size(320, 240);//width * pixelDensity(), height * pixelDensity());
  video.hide();
  noFill();

  x1 = width;
  y1 = height/2;
  x2 = width / 2;
  y2 = 0;
  x3 = width;
  y3 = height ;
}

function draw () {
  background(255, 5);
  //image(video, 0, 0, width, height);
  if (streamReady) {
    video.loadPixels();
    let counter = 0;
    let picked = 0;
    let px = video.width/2;
    let py = video.height/2;
    let idx, gr;
    noFill();
    stroke(255,0,0);
    strokeWeight(0.1);
    beginShape();
    while (true) {
      
      px = min(video.width-1, max(0, px + random(-20, 20)));
      py = min(video.height-1, max(0, py + random(-20, 20)));
      idx = parseInt(px) + parseInt(py)*video.width;
      gr = (video.pixels[idx*4+1]);
      if (gr<110) {
          curveVertex(px*2, py*2);
          picked++;
      }
      counter++;
      if (counter>5000 || picked>700) {
          break;
      }
    }
    endShape();
    
    
    
    
    
    counter = 0;
    picked = 0;
    px = video.width/2;
    py = video.height/2;
    stroke(0,255,0);
    beginShape();
    while (true) {
      px = min(video.width-1, max(0, px + random(-20, 20)));
      py = min(video.height-1, max(0, py + random(-20, 20)));
      idx = parseInt(px) + parseInt(py)*video.width;
      gr = (video.pixels[idx*4+2]);
      if (gr<110) {
          curveVertex(px*2, py*2);
          picked++;
      }
      counter++;
      if (counter>5000 || picked>700) {
          break;
      }
    }
    endShape();
    
    
        counter = 0;
    picked = 0;
    px = video.width/2;
    py = video.height/2;
    stroke(0,0,255);
    beginShape();
    while (true) {
      px = min(video.width-1, max(0, px + random(-20, 20)));
      py = min(video.height-1, max(0, py + random(-20, 20)));
      idx = parseInt(px) + parseInt(py)*video.width;
      gr = (video.pixels[idx*4]);
      if (gr<110) {
          curveVertex(px*2, py*2);
          picked++;
      }
      counter++;
      if (counter>5000 || picked>700) {
          break;
      }
    }
    endShape();
    
    
    
    
    video.loadPixels();

  for (var i = 0; i < nDots; i++) {
     
    var dotXPosition = dotXstart + subX;
    var dotYPosition = dotXstart + subY;
    
    subX += random(rndMin, rndMax);
    subY += random(rndMin, rndMax);

    var col = video.get(dotXPosition / vScale, dotYPosition / vScale);

    
    var rgb = col[0] + col[1] + col[2];


    var brushSize = map(rgb, 0, 765, maxBrushSize, minBrushSize);
    
    fill(50);
    circle(dotXPosition, dotYPosition, brushSize)
    
    if (subX > 320) {
      subX = 0;
      subY = 0;
    } 
    
    if (subX < -320) {
      subX = 0;
      subY = 0;
    } 
    
    if (subY > 240) {
      subX = 0;
      subY = 0;
    }
    
    if (subX < -440) {
      subX = 0;
      subY = 0;
    }
  }
}

function keyReleased() {
  if (key == 'r' || key == 'R') background(200);
}

    
  
   video.loadPixels();
  
  if (mouseIsPressed) {  
  var col = video.get(mouseX / vScale, mouseY / vScale);
  console.log(col);
  var rgb = col[0] + col[1] + col[2];
    
  brushSize = map(rgb, 0, 765, 20, 0);
    
  circle(mouseX, mouseY, brushSize);
  }
  
  
    
}