//var m,x = 100,p,d;
var panel = [];


function setup() {
	createCanvas(windowWidth, windowHeight);	
	
	panel.push = new panels(100, height/ width);
	
	//m = height/ width;
	
	//-width/2; 
	//var p = 2/3;// proporcion del rectangulo interior
	//var d = 0; // desplazamiento delos axis x para lograr proporcionar mejor el rect
}

function draw() {
	translate(width/2,height/2);
	background(20,10);
	//scale(0.5);
	panel.draw();
	
	axis();
}

function axis(){
	stroke(255);
	line(-width/2,-height/2, width/2,height/2);
	line(-width/2, height/2, width/2, -height/2);
	line(0,-height/2, 0, height/2);
	line(-width/2,0,width/2,0);
}
//pendiente = m, parametro de x en y = mx
function panels( posX = 100, pendiente = 1, fil = true, strok = false){
	this.m = pendiente;
	this.x = posX;
	this.escale = 2/3;
	this.fil = fil;
	this.filColor = color(255, 204, 0);
	this.strok = strok;
	this.fixEscl = (this.m*(-this.x) - this.m*(-this.x*this.escale));

	this.draw = function() {
		
		if (this.fil == false) noFill(); 
		else fill(this.filColor);
		if (this.strok == true) stroke(25);
		else noStroke();
		
		if ( this.m != 1){
			beginShape();
			// Exterior part of shape, sentido horario
			vertex(-this.x,  this.m * (-this.x));
			vertex( this.x, -this.m * (this.x));
			vertex( this.x,  this.m * (this.x));
			vertex(-this.x,  this.m * (this.x));
			// Interior part of shape, sentido antihorario
			beginContour();
			vertex(( this.fixEscl - this.x)*this.escale,  this.m*(-this.x*this.escale));
			vertex(( this.fixEscl - this.x)*this.escale,  this.m*( this.x*this.escale));
			vertex((-this.fixEscl + this.x)*this.escale,  this.m*( this.x*this.escale));
			vertex((-this.fixEscl + this.x)*this.escale, -this.m*( this.x*this.escale));
			endContour();
			endShape(CLOSE);
		}
		else if (this.m == 1) {
			beginShape();
			// Exterior part of shape, sentido horario
			vertex(-this.x,  this.m * (-this.x));
			vertex( this.x, -this.m * (this.x));
			vertex( this.x,  this.m * (this.x));
			vertex(-this.x,  this.m * (this.x));
			// Interior part of shape, sentido antihorario
			beginContour();
			vertex((- this.x)*this.escale,  this.m*(-this.x*this.escale));
			vertex((- this.x)*this.escale,  this.m*( this.x*this.escale));
			vertex((  this.x)*this.escale,  this.m*( this.x*this.escale));
			vertex((  this.x)*this.escale, -this.m*( this.x*this.escale));
			endContour();
			endShape(CLOSE);
		}
		
	}
	//this.
}