var ang = 0;

function setup() {
  createCanvas(windowWidth, 500);
	angleMode(DEGREES);
  frameRate(30);
}

function draw() {
  background(0,15);
	translate(width/2, height/2);
	//ang = spiral(100,50, ang, 74);
	abLissa = lissajous(abLissa[0], abLissa[1], color(0,220,50,random(200)));
	panels(40,width,pain,45);	
	if (frameCount%10 == 0 || frameCount%11 == 0) pain = !pain
}
var abLissa = [1,2];
function lissajous (a = 1, b = 2, colored = color(250), A = random(600,650), B = random(200,210),  delta = 0){
	push();
	scale(1);
	stroke(colored);
	strokeWeight(0.5);
	delta = frameCount;
	if (frameCount%240 == 0){
		a = round(random(1,10));
		b = round(random(1,10));
	}
	let x1, y1, x2, y2;
	//point(a*cos(millis()),a*2*sin(natural*millis()));
	for (let t = 1; t <= 5*360; t++){
		x1= A*sin(a*t + delta);
		y1= B*sin(b*(t));
		x2= A*sin(a*(t+2) + delta);
		y2= B*sin(b*(t+2));
		line(x1,y1,x2,y2);	
	}
	pop();
	return [a,b];
} 
var pain = false;
function panels (weight = 80, widht = windowWidth , paint = true, angle=45 , rectan = 1) {
	push();
	rotate(angle);
	noFill();
	strokeWeight(weight);
	rectMode(CENTER);
	
	for(let i = weight; i <= width; i+= 2*weight){
		if (paint == true){ 
			stroke(0);
		}
		else noStroke();
		//stroke(i*0.2);
		rect(0,0,i*rectan,i);	
		paint = !paint;
	}
	pop();
}
var ang = 0;
function spiral(widht = 100, heigth = 50, angle = 0, notable = 90) {
	rectMode(CENTER);
	noFill();
	stroke(250);
	push();
	scale(1);
	rotate(angle += notable);
	let height2;
	for (i = 0; i < width; i += 20) {
		push()
		stroke(i%250,0,frameCount%250);
		rotate(angle += notable);
		height2 = ((widht + i) * heigth) / widht;
		rect(0,0, widht + i, height2);
		pop();
	}
	pop();
	return angle;
}
