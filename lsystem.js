/* LSystem */

function LSystem(axiom, ruleset) {
	this.alphabet = ['F', '+', '-', '[', ']'];
	this.axiom = axiom;
	this.rule = ["", "+", "-", "[", "]"];
	this.tree = "";
	this.rule[0] = ruleset;
	this.draw = function(x, y, zoom, angle) {
		context.fillStyle = "#000";
		context.strokeStyle = "#000";
		context.save();
		context.translate(x, y);
		for (var i=0; i<this.tree.length; i++) {
			switch (this.tree.charAt(i)) {
				case 'F':
					context.beginPath();
					context.moveTo(0, 0);
					context.lineTo(0, zoom);
					context.stroke();
					context.closePath();
					context.translate(0, zoom);
					break;

				case '+':
					context.rotate(angle);
					break;

				case '-':
					context.rotate(-angle);
					break;

				case '[':
					context.save();
					break;

				case ']':
					context.restore();
					break;
			}
		}
		context.restore();
	}

	this.iterate = function(max_length) {
		this.tree = this.axiom;
		var rule_length = [];
		for (var i=0; i<this.alphabet.length; i++) {
			rule_length[i] = this.rule[i].length;
		}
		for ( var i=0; i<max_length; i++) {
			var new_length = 0;
			for (var j=0; j<this.tree.length; j++) {
				var c = this.tree.charAt(j);
				for (var k=0; k<this.alphabet.length; k++) {
					if (c == this.alphabet[k]) {
						new_length += rule_length[k];
						break;
					}
				}
			}
			var new_tree = [];
			for (var j=0; j<this.tree.length; j++) {
				var c = this.tree.charAt(j);
				for (var k=0; k<this.alphabet.length; k++) {
					if (c == this.alphabet[k]) {
						new_tree.push(this.rule[k]);
						break;
					}
				}
			}
			this.tree = new_tree.join("");
		}
	}
}

var lsystem = new LSystem();
var width = 1200;
var height = 600;

function setup(axiom, ruleset, iterations) {
	lsystem = new LSystem(axiom, ruleset);
	lsystem.iterate(iterations);
}

function draw(x, y, axiom, ruleset, iterations, angle, zoom) {
	context.fillStyle = "#fff";
	context.fillRect(0, 0, width, height);
	var angle_radians = angle * (Math.PI / 180);
	lsystem.draw(x, y, zoom, angle_radians);
}

function generate() {
	var axiom = document.getElementById("axiom").value;
	var ruleset = document.getElementById("ruleset").value;
	var angle = document.getElementById("angle").value;
	var iterations = document.getElementById("iterations").value;
	var zoom = document.getElementById("zoom").value;

	var x = document.getElementById("x").value;
	var y = document.getElementById("y").value;

	setup(axiom, ruleset, iterations);
	draw(x, y, axiom, ruleset, iterations, angle, zoom);
}

generate();