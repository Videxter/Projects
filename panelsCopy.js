class  panels {
	constructor(posX = 100, pendiente = 1, escale = 2/3, fix = 1, fil = true, strok = true){
		this.m = pendiente;
		this.x = posX;
		this.escale = escale;
		this.fil = fil;
		this.filColor = color(255, 204, 0);
		this.strok = strok;
		this.fixEscl = 0;
		if ( fix == 1){
			this.fixEscl = (this.m*(-this.x) - this.m*(-this.x*this.escale));
		}
		else {
			this.fixEscl = fix;	
		}

		
	}
		
	draw() {
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
		//push();
	}
}

class multiPanels {
	constructor(quantum = 5, pendiente = 1, escale = 2/3, fix = 1){
		this.multi = [];
		this.pendiente = pendiente;
		this.escale = escale;
		this.quantum = quantum;
		this.turnOn = 0;
		this.fix = fix;
		
		
	}

	fillScreen() {
		var x = this.pendiente*windowWidth;
		for (let i = 1; i <= this.quantum; i++) {
			this.multi.push(new panels(x, this.pendiente, this.escale, this.fix));
			x = x*this.escale;
		}
	}

	draw() {
		for (let panel of this.multi) { 
			panel.draw();
		}
	}

	drawNegatives(paridad = 0){
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