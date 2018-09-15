var pain = false, ang = 0;

function setup() {
  createCanvas(windowWidth, 300);
	angleMode(DEGREES);
  frameRate(30);
}

function draw() {
  background(2);
	translate(width/2, height/2);
	ang = spiral(100,50, ang, 60);
	panels(40,width,pain,45);
	
	//pain = !pain;
}
function panels (weight = 80, widht = windowWidth , paint = true, angle=45 , rectan = 1) {
	push();
	rotate(angle);
	noFill();
	strokeWeight(weight);
	rectMode(CENTER);
	
	for(let i = weight; i <= width; i+= 2*weight){
		if (paint == true) stroke(0);
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
