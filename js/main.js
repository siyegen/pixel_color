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

function MrSquare(point, size, color) {
	this.position = point;
	this.size = size;
	this.color = color;

	this.ctx = new PIXI.Graphics();
	this.ctx.position.x = point.x;
	this.ctx.position.y = point.y;
}

function Emitter(point, delay, startColor) {
	this.position = point;
	this.delay = delay;
	this.color = startColor;
	this.emitting = false;
	this.lastEmit = null;
}

Emitter.prototype.emit = function() {
	var size = 30;
	size += Math.floor(Math.random() * (50+1)); // jitter size
	var color = this.color;
	// step color
	this.color += Math.floor(Math.random() * (1000+1));

	return new MrSquare(this.position, size, color);
};

Emitter.prototype.queue = function() {
	if (this.lastEmit == null) { // first emit
		this.emitting = true;
		this.lastEmit = Date.now();
		return this.emit();
	} else if (Date.now() - this.lastEmit >= this.delay) { // time to emit
		this.emitting = true;
		this.lastEmit = Date.now();
		return this.emit();
	} else {
		return null;
	}

}

var emitter = new Emitter({x:0,y:0}, 2000, 0xA40CE8);

var particleNumber = 10;
var allSquares = [];
function addSquare() {
	if (allSquares.length >= particleNumber) return;
	var sq = emitter.queue();
	if (sq !== null) {
		console.log("adding square", Date.now());
		allSquares.push(sq);
		console.log(sq);
		camera.addChild(sq.ctx);
	}
}

function render() {
	for (var i=allSquares.length-1; i>=0; i--){
		console.info("render square");
		allSquares[i].ctx.clear();
		allSquares[i].ctx.beginFill(allSquares[i].color);
		allSquares[i].ctx.drawRect(
			-allSquares[i].size/2,
			-allSquares[i].size/2,
			allSquares[i].size,
			allSquares[i].size
		);
		allSquares[i].ctx.endFill();
	}

	renderer.render(stage);
};

function update(timeDelta) {
	addSquare();
	for (var i=allSquares.length-1; i>=0; i--){
		if (allSquares[i].size < 1000) {
			allSquares[i].size += 2;
		}
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
