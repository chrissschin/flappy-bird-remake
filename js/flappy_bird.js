var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');
var makePipes = require('./systems/makepipes');

var bird = require('./entities/bird');
var pipe = require('./entities/pipe');

//log whats going on
console.log(pipe);
console.log(bird);
console.log(graphicsSystem);
console.log(inputSystem);

var FlappyBird = function() {
    this.entities = [new bird.Bird()];
    this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
    this.physics = new physicsSystem.PhysicsSystem(this.entities);
    this.inputs = new inputSystem.InputSystem(this.entities);
    this.pipes = new makePipes.MakePipes(this.entities);
};

FlappyBird.prototype.run = function() {

    this.graphics.run();
    this.physics.run();
    this.inputs.run();
    this.pipes.run();
};

exports.FlappyBird = FlappyBird;
