var pain = false, ang = 0;

function setup() {
  createCanvas(windowWidth, 600);
	angleMode(DEGREES);
  frameRate(30);
}

function draw() {
  background(200,1);
	translate(width/2, height/2);
	//ang = spiral(100,50, ang, 74);
	//panels(40,width,pain,45);
	lissajous(2);
	//if (frameCount%10 == 0 || frameCount%11 == 0) pain = !pain
}

function lissajous (natural = 1,a = 120){
	push();
	scale(1);
	stroke(2);
	strokeWeight(3);
	var x = frameCount;
	//point(a*cos(millis()),a*2*sin(natural*millis()));
	line(a*cos(x),a*sin(x),a*cos(x+1),a*sin(x+1));
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
