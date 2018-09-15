var diametro = 400;
var radius = -diametro/2;
var dm, dM;
var desplazar = 0;
function setup() {
 	createCanvas(windowWidth,windowHeight);
	frameRate(10);
}

function draw() {
	translate(width/2,height/2);
	//rotate(frameCount);
    background(0,100);
	
	//strokeWeight(2);
	circle();

	push();
	translate(-width/4,0);
	circle();
	pop();
	
	push();
	translate((width)/4,0);
	circle();
	pop();
	desplazar+=5;
	if (frameCount%10==0)desplazar=0;
}

function circle(diametro = 400, radius = -diametro/2,){
	strokeWeight(2);
	noFill();
	for (i = radius; i < abs(radius)+1; i+=50){
		stroke(250);
		dM = sqrt(sq(diametro/2)-sq(i+desplazar))*2;
		//point();
		ellipse(0,i+desplazar,dM, (diametro*0.1)*dM/diametro);
		
	}
}