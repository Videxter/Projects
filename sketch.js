var origin = 0.5;
var w = 100;
var h = 50, hh = 0;
var posx, posy, 
angle = 0, notable = 4; //160 16 13 12 8 4 3

var panel;
function setup() {
	createCanvas(windowWidth, windowHeight);	
	angleMode(DEGREES);
    frameRate(30);
	
	panel = new multiPanels(8, height/ width, 0.8, 0.5);
}

function draw() {
	translate(width/2,height/2);
	background(20,100);
	//scale(0.5);
	noFill();
    stroke(250);
    //rotate();
    push();
    scale(1.5);
    for (i = 0; i < height/3; i+=4){
        push()
        //stroke(i%250,0,frameCount%250);
        rotate(angle+=notable);
        posx = -origin*(w+i);
        hh = ((w+i)*h)/w;
        posy = -origin*hh;
        rect(posx,posy,w+i,hh);
        pop();
    }
    pop();

	panel.fillScreen();
	panel.setNegatives(1);
	panel.draw();
	//axis();
}

function axis(){
	stroke(255);
	line(-width/2,-height/2, width/2,height/2);
	line(-width/2, height/2, width/2, -height/2);
	line(0,-height/2, 0, height/2);
	line(-width/2,0,width/2,0);
}
//pendiente = m, parametro de x en y = mx
