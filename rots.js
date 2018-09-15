var origin = 0.5;
var w = 100;
var h = 50, hh = 0;
var posx, posy, 
angle = 0, notable = 3; //160 16 13 12 8 4 3
function setup() {
  createCanvas(windowWidth, windowHeight-300);
    angleMode(DEGREES);
    frameRate(30);
}

function draw() {
  background(0,50);
    //
    translate(width/2, height/2);
    noFill();
    stroke(250);
    //rotate();
    for (i = 0; i < height; i+=4){
        push()
        //stroke(i%250,0,frameCount%250);
        rotate(angle+=notable);
        posx = -origin*(w+i);
        hh = ((w+i)*h)/w;
        posy= -origin*hh;
        rect(posx,posy,w+i,hh);
        pop();
    }
    //angle=0;
    //rect(-origin*w,-origin*h,w,h);
    //
    
}

