(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
console.log("Hi");

// fullscreen
var width = window.innerWidth;
var height = window.innerHeight;

var stage = new PIXI.Stage(0xFFE05B, true);
var renderer = PIXI.autoDetectRenderer(width, height);

document.body.appendChild(renderer.view);

var dodPixel = new PIXI.Graphics();
stage.addChild(dodPixel);
dodPixel.size = 20;
dodPixel.position.x = width/2 - dodPixel.size/2;
dodPixel.position.y = height/2 - dodPixel.size/2;
dodPixel.iter = 0;


console.log(dodPixel.pivot);

function render() {
	dodPixel.clear();
	if (dodPixel.iter < 1000) {
		dodPixel.beginFill(0xA40CE8);
		dodPixel.drawRect(0,0, dodPixel.size, dodPixel.size);
		dodPixel.endFill();
	}

	renderer.render(stage);
};

function update(timeDelta) {
	// dodPixel.size += 1;
	dodPixel.position.x = width/2 - dodPixel.size/2;
	dodPixel.position.y = height/2 - dodPixel.size/2;
	// dodPixel.iter +=1;
	// dodPixel.rotation +=0.1;
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
		dodPixel.size +=10;
	}
	console.log(dodPixel);
});

},{}]},{},[1])