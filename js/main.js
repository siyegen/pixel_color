console.log("Hi");

// fullscreen
var width = window.innerWidth;
var height = window.innerHeight;

var stage = new PIXI.Stage(0xFFE05B, true);
var renderer = PIXI.autoDetectRenderer(width, height);

document.body.appendChild(renderer.view);

var camera = new PIXI.DisplayObjectContainer();
camera.position.x = width/2;
camera.position.y = height/2;
stage.addChild(camera);

var squares = [];
var squareNumbers = 50;
var startColor = 0xA40CE8;

for (var i=0; i<squareNumbers; i++) {
	var mrSquare = new PIXI.Graphics();
	mrSquare.position.x = 0;
	mrSquare.position.y = 0;
	mrSquare.color = startColor;
	mrSquare.iter = 0;
	mrSquare.size = 30;
	camera.addChild(mrSquare);
	squares.push(mrSquare);
}


function render() {
	for (var i=0; i<squares.length; i++) {
		rSqr = squares[i];
		rSqr.clear();
		if (rSqr.iter > 1000) {
			rSqr.destroy();
			delete squares[i];
		} else {
			rSqr.beginFill(rSqr.color);
			rSqr.drawRect(-rSqr.size/2, -rSqr.size/2, rSqr.size, rSqr.size);
			rSqr.endFill();
			rSqr.color += rSqr.iter * Math.floor(Math.random() * (10+1));
		}
	}

	renderer.render(stage);
};

function update(timeDelta) {
	for (var i=0; i<squares.length; i++) {
		rSqr = squares[i];
		rSqr.rotation += 0.05;
		rSqr.size += 0.5;
		rSqr.iter++;
	}
};

function main() {
	var now = Date.now();
	update((now-then)/1000);
	render();
	then = now;
	requestAnimFrame(main);
};

var then = Date.now();
main();

console.log('start');

window.addEventListener('keydown', function(e) {
	if (e.keyCode == 32) {
		mrSquare.size +=10;
	}
	console.log(mrSquare);
});