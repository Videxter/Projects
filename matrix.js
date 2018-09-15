var angle = 0;

var points = []; // array pvector [8] 
//var points = Array(8);

var projection = [
  [1, 0, 0],
  [0, 1, 0]
];

function setup() {
  createCanvas(600, 400);
  angleMode(DEGREES);
  points.push(createVector(-0.5, -0.5, -0.5));
  points.push(createVector(0.5, -0.5, -0.5));
  points.push(createVector(0.5, 0.5, -0.5));
  points.push(createVector(-0.5, 0.5, -0.5));
  points.push(createVector(-0.5, -0.5, 0.5));
  points.push(createVector(0.5, -0.5, 0.5));
  points.push(createVector(0.5, 0.5, 0.5));
  points.push(createVector(-0.5, 0.5, 0.5));
}

function draw() {
  background(0,20);
  translate(width/2, height/2);

  var rotationZ = [
    [ cos(angle), -sin(angle), 0],
    [ sin(angle), cos(angle), 0],
    [ 0, 0, 1]
  ];

  var rotationX = [
    [ 1, 0, 0],
    [ 0, cos(angle), -sin(angle)],
    [ 0, sin(angle), cos(angle)]
  ];

  var rotationY = [
    [cos(angle), 0, sin(angle)],
    [0, 1, 0],
    [-sin(angle), 0, cos(angle)]
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

  for (let v of projected) {
    stroke(255);
    strokeWeight(2);
    noFill();
    point(v.x, v.y);
  }

  // Connecting
  for (var i = 0; i < 4; i++) {
    connect(i, (i+1) % 4, projected);
    connect(i+4, ((i+1) % 4)+4, projected);
    connect(i, i+4, projected);
  }

  angle += 1;
}

//*************************************POINTS CONNECTION**********************************

function connect(i, j, points) {
  var a = points[i];
  var b = points[j];
  strokeWeight(2);
  stroke(20,100,255);
  line(a.x, a.y, b.x, b.y);
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