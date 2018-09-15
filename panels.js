function  panels (posX = 100, pendiente = 1, escale = 2/3, fix = 1, fil = true, strok = true) {
	
	this.m = pendiente;
	this.x = posX;
	this.escale = escale;
	this.fil = fil;
	this.filColor = color(255, 204, 0);
	this.strok = strok;
	this.fixEscl = 0;
	let yOut = this.m * (this.x); //exterior
	let yIn  = this.m*(this.x*this.escale);
	let xIn  =  this.x*this.escale;
	
	if ( fix == 1){
		this.fixEscl = (this.m*(-this.x) - this.m*(-this.x*this.escale));
	}
	else {
		this.fixEscl = fix;	
	}

	this.draw = function() {
		if (this.fil == false) noFill(); 
		else fill(this.filColor);
		if (this.strok == true) stroke(25);
		else noStroke();
		
		let yOut = this.m * (this.x); //exterior
		let yIn  = this.m*(this.x*this.escale);
		let xIn  =  this.x*this.escale;
		beginShape();
		// Exterior part of shape, sentido horario
		vertex(-this.x,  -yOut);
		vertex( this.x, -yOut);
		vertex( this.x,  yOut);
		vertex(-this.x,  yOut);
		// Interior part of shape, sentido antihorario
		beginContour();
		vertex(- xIn ,  -yIn);
		vertex( - xIn,  yIn);
		vertex(  xIn,  yIn);
		vertex( xIn, -yIn);
		endContour();
		endShape(CLOSE);
	}
}

function multiPanels (quantum = 5, pendiente = 1, escale = 2/3, fix = 1){
	
	this.multi = [];
	this.pendiente = pendiente;
	this.escale = escale;
	this.quantum = quantum;
	this.turnOn = 0;
	this.fix = fix;

	this.fillScreen = function() {
		var x = this.pendiente*windowWidth;
		for (let i = 1; i <= this.quantum; i++) {
			this.multi.push(new panels(x, this.pendiente, this.escale, this.fix));
			x = x*this.escale;
		}
	}

	this.draw = function() {
		for (let panel of this.multi) { 
			panel.draw();
		}
	}

	this.setNegatives = function(paridad = 0){
		let count = 0;
		for (let panel of this.multi) {
			if (paridad == 0){
				if (count%2 == 0){ panel.fil = false}
				else if (count%2 != 0) {
					panel.fil = true;
					panel.filColor = color(0);
				}	
			}
			else {
				if (count%2 == 0){ 
					panel.fil = true;
					panel.filColor = color(0);
				}
				else if (count%2 != 0) {panel.fil = false}	
			} 
			//panel.draw();
			count++;
		}	
	}


}

var m;
var origin = 0.5;
var w = 100;
var h = 50,
	hh = 0;
var posx, posy,
	angle = 0,
	notable = 8; //160 16 13 12 8 4 3
function setup() {
	createCanvas(windowWidth, windowHeight - 300);
	angleMode(DEGREES);
	frameRate(30);
	m = height / width;
	angleMode(DEGREES);
	rectMode(CORNERS);
}

function draw() {
	background(250,50);
	translate(width / 2, height / 2);
	scale(1);
	noFill();
	stroke(250);
	//rotate();
	/*for (i = 0; i < height/2; i += 4) {
		push()
		//stroke(i%250,0,frameCount%250);
		rotate(angle += notable);
		posx = -origin * (w + i);
		hh = ((w + i) * h) / w;
		posy = -origin * hh;
		rect(posx, posy, w + i, hh);
		pop();
	}
*/
	fill(200,0,0);
	noStroke(0);
	//rotate(frameCount);
	var x = 100;
	var escale = 2 / 3;
	var wid = dist(-x, -x * m, x, x * (-m));
	var heig = dist(0, -x * m, 0, -x * (m) * escale);
	rect(-x, -x * m, -x+ wid, (-x * m) + heig);
	rect(-x, (x * m) - heig, (-x + wid) ,(x * m));
	
	fill(0);
	stroke(0);
	//rect(-x, (-x * m) + heig, -x + heig,);
	//rect(x - heig, (x * (-m)) + heig, heig, wid - (2 * heig));
	//rect(10,10,40,40);
	axis();
}
function axis(){
	stroke(5);
	line(-width/2,-height/2, width/2,height/2);
	line(-width/2, height/2, width/2, -height/2);
	line(0,-height/2, 0, height/2);
	line(-width/2,0,width/2,0);
}