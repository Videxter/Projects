var y =10; angle = 0, speed= 5; framer = 30 /*frameRate*/ , strobs = true, Key = "1";
var rand=false;//random para fills
var direction = true, state=0, scaler = false;	

//
var x;
function setup() {
	createCanvas(windowWidth,760-100);
	background(20);
	angleMode(DEGREES);
	frameRate(framer);
	strokeWeight(3);
	paleta = [
	color(255,0,0), color(255,20,10), color(255,69,0), color(0,255,0), color(124,252,0), 
	color(127,255,0), color(0,250,154),
	color(0,255,127), color(32,178,170), color(0,206,209), color(208,170,8)
	];
	points = initCube(points);
	points2 = initCube(points2);
  	points3 = initCube(points3);
}

function draw(){ 
	bckg(0);
	translate(width/2,height/2);
	ang = spiral(100,50, ang, notab);
	abLissa = lissajous(abLissa[0], abLissa[1]);
	rLines();
	esferas();
	eCube(angulo,points,color(200,50,25));
	eCube(angulo+5,points2,color(20,100,255));
  	eCube(angulo+12,points2, color(200,50,25));
	panels(40,width,pain,45);

}


var counter=0, keyCtrl = 0;
function keyPressed(){
	counter ++;
	if (keyCode === CONTROL){
		//background(200,0,200,160);
		strobs = !strobs;
		counter	= 1;
		keyCtrl = 17;
	}
	else if (keyCode === 82) rand = !rand //cuando key = R (randoom)
	else if (keyCode === 68) {direction	= !direction; keyCtrl+=68;} // D
	else if (keyCode === 67) {curves = !curves} //C curves
	else if (keyCode === 80) {pltte = !pltte} // P palette
	else if (keyCode === 66) {backOn = !backOn;} //B bckground
	else if (keyCode === 78) { // N new colors / notables
		colored = round(random(0, paleta.length - 1));
		notab = round(random(1, 359));
	}
	else if (keyCode === 69) {ellips = !ellips} //Ellipses 
	else if (keyCode === 76) {lins = !lins;} // lines
	else if (keyCode === 83) {spiralrect = !spiralrect;} // S spiral rects
	else if (keyCode === 65) {panel = !panel;}
	else if (keyCode === 84) {tridi = !tridi;}
	else if (keyCode === 9) {keyCode = 0} 

	//else if (keyCode === 80)
	//else if (keyCode === 80)

	else if (key === "1") Key = key
	else if (key === "2") Key = key
	else if (key === "3") Key = key	
	else if (key === "4") Key = key
	else if (key === "5") Key = key
	//else if (keyCode === 225 ) Key = key
	
	if (counter>2) {counter = 0; keyCtrl = 0;}
	print (keyCode);
	
}

// 85 =  ctrl + d //
var dOn = true;
function dir(min=0, max=1, mapeado, velocity = 0.02){
	if (keyCtrl == mapeado) dOn = !dOn; 

	if (dOn){
		if (direction && state <= 1) {state += (1 - state) * velocity;}	// el num 1 y 0 es un punto de referencia para la direccion del movimiento
		else if (!direction && state >= 0) state+= (0 - state) * velocity
		if (min != 0 || max != 1) return map(state,0,1,min,max)		
		else return	state
	}
	else return	state	
}

//bckground
var backOn = false;
function bckg(alpha = 100){
	if (backOn){
		background(strobos(130,Key, color(250,250)));
	}
	else background(0,100);
}

// funcion que recrea una luz stroboscopica usando dos colores 
//                 beat   tecla actual    color de encendido  color de "apagado"       fill cada x segundos  
function strobos(bpm = 130, K = "1", colorOn = color(250,220), colorOff = color(0,220), fillTime = 8) {
	var x;	
	var eightSeg = round(framer*8); //calcula la cantidad de frames en 8 segundos, segun el frameRate
	if (strobs){
		if (K == 17) key = "1"
		var i = int(K); //equivalente entero de Key
		if (rand){ //random cada 8 segundos
			if (frameCount%eightSeg >= eightSeg-50 && frameCount%eightSeg  <= eightSeg-1){
				i = round(random(3,5));
			}
		}
		x = (60/(i*bpm)); // ratio seconds x minute // Rapidez del strob
		x = round(x*framer); // 
		if (frameCount%x == 0) return colorOn;
		else return colorOff;
	}
	else return	colorOff;//color(0,250);
}

let paleta = [];
var pltte = false;
var colored = 0; //paleta[round(random(0, paleta.length - 1))]
function palette(){ // plets 
	if (pltte) return strobos(130,Key,paleta[colored]);
	else return strobos(130,Key, color(200,255))
}

var lins = false;
function rLines(posX = random(-width/2, width/2), lines = 10, space = 20, weight = 15, grayscale = 240){
	if (lins){
		stroke(palette());	
		lines = width/2;
		strokeWeight(strkWght = round(random(1,2)));
		posX -= (lines*space)/2; // "centrado" del grid
		for (var i = 0; i < lines; i++) {
			if (i != 0) line( posX+space*i, -height/2, posX+space*i, height/2);
			else line( posX , -height/2 , posX ,height/2);
		}
	}
}

var ellips = false;
var desplazar = 0; diametro	= 500;
function circle(diametro = 400, radius = -diametro/2,){
	strokeWeight(2);
	noFill();
	for (i = radius; i < abs(radius)+1; i+=50){
		if (frameCount%180 <= 90) stroke(palette());
		else stroke(paleta[colored]);
		dM = sqrt(sq(diametro/2)-sq(i+desplazar))*2;
		//point();
		ellipse(0,i+desplazar,dM, (diametro*0.1)*dM/diametro);
		
	}
}

function esferas(){
	if (ellips) {
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
}

var abLissa = [1,2], curves =  false;
function lissajous (a = 1, b = 2, colore = paleta[colored], A = random(600,650), B = random(200,210),  delta = 0){
	if (curves) {
		push();
		scale(1);
		stroke(palette());
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
	}
	return [a,b];
}

var ang = 0, notab = 30, spiralrect = false;
function spiral(widht = 100, heigth = 50, angle = 0, notable = 90) {
	if (spiralrect) {
		rectMode(CENTER);
		noFill();
		push();
		scale(1);
		strokeWeight(0.5);
		rotate(angle += notable);
		let height2;
		for (i = 0; i < width; i += 20) {
			push()
			stroke(palette(), random(150,255));
			rotate(angle += notable);
			height2 = ((widht + i) * heigth) / widht;
			rect(0,0, widht + i, height2);
			pop();
		}
		pop();
	}
	return angle;
}

var pain = false, panel = true; 
function panels (weight = 80, widht = windowWidth , paint = true, angle=45 , rectan = 1) {
	if (panel){
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
		if (frameCount%200 == 0 || frameCount%201 == 0) pain = !pain
	}
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var angulo = 0;
var points = [], points2 = [], points3 = []; // array pvector [8] 
//var points = Array(8);
var projection = [
  [1, 0, 0],
  [0, 1, 0]
];

function initCube(point = []){
  // array pvector [8] 
  angleMode(DEGREES);
  point.push(createVector(-0.5, -0.5, -0.5));
  point.push(createVector(0.5, -0.5, -0.5));
  point.push(createVector(0.5, 0.5, -0.5));
  point.push(createVector(-0.5, 0.5, -0.5));
  point.push(createVector(-0.5, -0.5, 0.5));
  point.push(createVector(0.5, -0.5, 0.5));
  point.push(createVector(0.5, 0.5, 0.5));
  point.push(createVector(-0.5, 0.5, 0.5));
  return point;
}
var tridi = false;
function eCube(angle,points, colores){
	if (tridi){
		var rotationZ = [
	    	[ cos(angulo), -sin(angulo), 0],
	    	[ sin(angulo), cos(angulo), 0],
	    	[ 0, 0, 1]
	  	];

	  	var rotationX = [
	    	[ 1, 0, 0],
	    	[ 0, cos(angulo), -sin(angulo)],
	    	[ 0, sin(angulo), cos(angulo)]
	  	];

		var rotationY = [
			[cos(angulo), 0, sin(angulo)],
			[0, 1, 0],
			[-sin(angulo), 0, cos(angulo)]
		];

	  	var projected = [];

	  	var index = 0;
	  	for (let v of points) { //p5 vector
		    var rotated = matmul(rotationY, v); //p5 vector
		    rotated = matmul(rotationX, rotated);
		    rotated = matmul(rotationZ, rotated);
		    var projected2d = matrixToVec(matmul(projection, rotated)); //p5 vector
		    projected2d.mult(200);
		    projected[index] = projected2d;
		    //point(projected2d.x, projected2d.y);
		    index++;
	  	}
	/*
	  	for (let v of projected) {
		    stroke(255);
		    strokeWeight(2);
		    noFill();
		    point(v.x, v.y);
	  	}
	*/
		  // Connecting
		for (var i = 0; i < 4; i++) {
		    connect(i, (i+1) % 4, projected);
		    connect(i+4, ((i+1) % 4)+4, projected);
		    connect(i, i+4, projected);
		}

	  	angulo += 1;
	}
}



//*************************************POINTS CONNECTION**********************************

function connect(i, j, points) {
  push();
  scale(2);
  var a = points[i];
  var b = points[j];
  strokeWeight(0.5);
  stroke(palette());
  line(a.x, a.y, b.x, b.y);
  pop();
}

//*************************************MATRIX OPERATIONS**********************************
function vecToMatrix(vector = createVector(0,0,0)) {
  var mat = [[0],[0],[0]];
  mat[0][0] = vector.x;
  mat[1][0] = vector.y;
  mat[2][0] = vector.z;
  //print(m[0][0],m[1][0],m[2][0]);
  return mat;
}

function matrixToVec(matrix) {
  var vec = createVector();
  vec.x = matrix[0][0];
  vec.y = matrix[1][0];
  if (matrix.length > 2) {
    vec.z = matrix[2][0];
  }
  return vec;
}

function logMatrix(mat) {
  var cols = mat[0].length;
  var rows = mat.length;
  print(rows + "x" + cols);
  print("----------------");
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      print(mat[i][j] + " ");
    }
    print(" ");
  }
  print(" ");
}


function initMat(rows, cols) { 
  var m = [];
  for (var i = 0; i < rows; i++) {
    m.push([]);
    for (var j = 0; j < cols; j++) {
      m[i].push(0);
    }
  }
  return m;
}

function matmul( a, b) {
  var colsA = a[0].length;
  var rowsA = a.length;
  var colsB;
  if (b instanceof p5.Vector){ 
    b = vecToMatrix(b);
    colsB = b[0].length;
  }
  else if (typeof(b[0]) == 'number') { colsB = 1 }
  else {colsB = b[0].length}
  var rowsB = b.length;

  if (colsA != rowsB) {
    print("Columns of A must match rows of B");
    return null;
  }

  var result = initMat(rowsA,colsB); 

  for (var i = 0; i < rowsA; i++) {
    for (var j = 0; j < colsB; j++) {
      var sum = 0;
      for (var k = 0; k < colsA; k++) {
        sum += a[i][k] * b[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}
//*************************************MATRIX OPERATIONS**********************************
