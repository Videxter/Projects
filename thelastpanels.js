var pain = false, ang = 0;

function setup() {
  createCanvas(windowWidth, 600);
	angleMode(DEGREES);
  frameRate(30);
}

function draw() {
  background(0,150);
	translate(width/2, height/2);
	//ang = spiral(100,50, ang, 74);
	//panels(40,width,pain,45);
	let v = frameCount;
	
	lissajous(color(0,220,50,random(200)));
	//if (frameCount%10 == 0 || frameCount%11 == 0) pain = !pain
}

function parameters(A = 200, B = 200, a = 0, b = 0,  delta = 0){
	let params = [];
	if (frameCount%60 == 0){
		a = random(1,5);
		b = random(1,5);
		A = random(200,250);
		B = random(200,250);
	}
	return params;
}
function lissajous (colored = color(250), A = random(300,350), B = random(200,210),  delta = 0, a = 1, b = 2){
	push();
	scale(1);
	stroke(colored);
	strokeWeight(0.5);
	delta = frameCount;
	if (frameCount%120 == 0){
		a = random(1,5);
		b = random(1,5);
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
	
	//line(a*cos(millis()),a*2*sin(natural*millis()),a*cos(millis()+1/millis()),a*2*sin(natural*millis()+1/millis()));
	pop();
} 

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
