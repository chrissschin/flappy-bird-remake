var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');
var makePipes = require('./systems/makepipes');
var makeTop = require('./systems/maketop');

//event emitter
var events = require('events').EventEmitter;

var bird = require('./entities/bird');
var pipe = require('./entities/pipe');
var tops = require('./entities/top')



//log whats going on
// console.log(pipe);
// console.log(bird);
// console.log(graphicsSystem);
// console.log(inputSystem);



var FlappyBird = function() {
    this.eventEmits = new events();

    this.entities = [new bird.Bird(this.eventEmits)];
    this.graphics = new graphicsSystem.GraphicsSystem(this.entities, this.eventEmits);
    this.physics = new physicsSystem.PhysicsSystem(this.entities, this.eventEmits);
    this.inputs = new inputSystem.InputSystem(this.entities, this.eventEmits);
    this.pipes = new makePipes.MakePipes(this.entities, this.eventEmits);
    this.tops = new makeTop.MakeTop(this.entities, this.eventEmits);
};

FlappyBird.prototype.run = function() {

    this.graphics.run();
    this.physics.run();
    this.inputs.run();
    this.pipes.run();
    this.tops.run();
};

FlappyBird.prototype.reset = function() {

    this.entities = [new bird.Bird()];

};

exports.FlappyBird = FlappyBird;
