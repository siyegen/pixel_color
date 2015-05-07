console.log("Hi");

// Colors
function ColorChanger(startColor, endColor, step){
	this.startColor = startColor;
	this.endColor = endColor;
	this.step = [step];
	this.steps = [];
	this.init();
};

ColorChanger.prototype = {
	init: function(){
		this.steps[0] = Math.floor((this.endColor[0]
			- this.startColor[0])/this.step);
		this.steps[1] = Math.floor((this.endColor[1]
			- this.startColor[1])/this.step);
		this.steps[2] = Math.floor((this.endColor[2]
			- this.startColor[2])/this.step);
	},
	incrementAll: function(allColors, value){
		allColors[0] = this.increment(allColors[0],
			0, value);
		allColors[1] = this.increment(allColors[1],
			1, value);
		allColors[2] = this.increment(allColors[2],
			2, value);
		return allColors;
	},
	increment: function(color, which, value){
		return color + (value * Math.abs(this.steps[which]));
	}
}

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
	this.alive = false;

	this.ctx = new PIXI.Graphics();
	this.ctx.position.x = point.x;
	this.ctx.position.y = point.y;
}

MrSquare.prototype.reset = function() {
	this.size = 30;
	camera.removeChild(this.ctx);
	camera.addChild(this.ctx);
	this.alive=true;
};

function Emitter(point, delay, startColor, colorChanger) {
	this.position = point;
	this.delay = delay;
	this.color = startColor;
	this.colorChanger = colorChanger;
	this.lastEmit = null;

	this.count = 0;
	this.called = 0;
}

Emitter.prototype.emit = function() {
	var size = 30;
	// size += Math.floor(Math.random() * (150+1)); // jitter size
	// var color = this.color;
	// step color
	// this.color += Math.floor(Math.random() * (1000+1));
	var color = this.colorChanger.incrementAll(this.color.slice(0), this.called++);
	console.log(color);

	// var pos = {};
	// pos.x = this.position.x + Math.floor(Math.random() * (100+1));
	// pos.y = this.position.y + Math.floor(Math.random() * (100+1));
	return new MrSquare(this.position, size, color);
};

Emitter.prototype.queue = function() {
	if (this.lastEmit == null) { // first emit
		this.emitting = true;
		this.lastEmit = Date.now();
		return allSquares[this.count++]
	} else if (Date.now() - this.lastEmit >= this.delay) { // time to emit
		this.emitting = true;
		this.lastEmit = Date.now();
		return allSquares[this.count++]
	} else {
		return null;
	}

}

var particleNumber = 20;
var allSquares = [];
var colorChanger = new ColorChanger([10,0,100], [232,112,12], particleNumber);
var emitter = new Emitter({x:0,y:0}, 500, [100,180,255], colorChanger);

// Build all the "particles" before we use them
for (var i = 0; i < particleNumber; i++) {
	allSquares[i] = emitter.emit();
};


function addSquare() {
	if (emitter.count >= particleNumber) return;
	var sq = emitter.queue();
	if (sq !== null) {
		// allSquares.push(sq);
		// console.log(sq);
		sq.alive = true;
		camera.addChild(sq.ctx);
	}
}

var currentColor = '';
function render() {
	for (var i=allSquares.length-1; i>=0; i--){
		if (allSquares[i].alive) {
			allSquares[i].ctx.clear();
			currentColor = allSquares[i].color[0].toString(16)
				+ allSquares[i].color[1].toString(16) +
				allSquares[i].color[2].toString(16);
			allSquares[i].ctx.beginFill('0x'+currentColor);
			allSquares[i].ctx.drawRect(
				-allSquares[i].size/2,
				-allSquares[i].size/2,
				allSquares[i].size,
				allSquares[i].size
			);
			allSquares[i].ctx.endFill();
		}
	}

	renderer.render(stage);
};

function update(timeDelta) {
	addSquare();
	for (var i=allSquares.length-1; i>=0; i--){
		if (allSquares[i].size < 2000 && allSquares[i].alive) {
			allSquares[i].size += 4;
		} else if(!allSquares[i].alive && allSquares[i].size >= 2000) {
			allSquares[i].reset();
			console.log('dead');
		} else {
			allSquares[i].alive = false;
		}
		allSquares[i].ctx.rotation += 0.005;
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
