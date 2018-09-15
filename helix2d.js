
var r = 100;
var phi = 0;
var x1, y1, x=0, y=0;

function setup() {
  createCanvas(500, 500);
    angleMode(DEGREES);
    rotate(45);
}

function draw() {
    background(10,10);
    translate(width/2 - r/2,height/2);
    stroke(200);
    rotate(-90);
  phi += 0.01;
    //phi += 30;
    x1=x;y1=y;
  x = r*(phi - sin(frameCount/.1));
  x *= .5; // 横幅のスケールを圧縮した方が良いかな？
  y = r*(1 - cos(frameCount/0.1));
    //print(sin(frameCount/1));
  y =  y; // Convierta la dirección positiva del eje hacia arriba
  line(x1, y1,x,y);
}