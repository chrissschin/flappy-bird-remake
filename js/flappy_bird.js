var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');
var makePipes = require('./systems/makepipes');
var makeTop = require('./systems/maketop');
var backgroundSystem = require('./systems/background');
// var leftEdgeSystem = require('./systems/leftedge');

//event emitter
var events = require('events').EventEmitter;

var bird = require('./entities/bird');
var pipe = require('./entities/pipe');
var tops = require('./entities/top');
// var leftEdge = require('./entities/leftedge');



//log whats going on
// console.log(pipe);
// console.log(bird);
// console.log(graphicsSystem);
// console.log(inputSystem);



var FlappyBird = function() {
    this.eventEmits = new events();
    this.score = 0;
    this.scoreUi = document.getElementById('score');

    this.entities = [new bird.Bird(this.eventEmits)];
    this.graphics = new graphicsSystem.GraphicsSystem(this.entities, this.eventEmits);
    this.physics = new physicsSystem.PhysicsSystem(this.entities, this.eventEmits);
    this.inputs = new inputSystem.InputSystem(this.entities, this.eventEmits);
    this.pipes = new makePipes.MakePipes(this.entities, this.eventEmits);
    this.tops = new makeTop.MakeTop(this.entities, this.eventEmits);
    this.backgrounds = new backgroundSystem.BackgroundSystem(this.entities, this.eventEmits);
    // this.leftEdgeCrash = new leftEdgeSystem.LeftEdgeSystem(this.entities, this.eventEmits);
    this.eventEmits.on('scoreincrease', this.scorePlus.bind(this));
    this.eventEmits.on('scoreReset', this.scorereset.bind(this));

};

FlappyBird.prototype.run = function() {

    this.graphics.run();
    this.physics.run();
    this.inputs.run();
    this.pipes.run();
    this.tops.run();
    this.backgrounds.run();
    // this.leftEdgeCrash.run();

};

FlappyBird.prototype.reset = function() {

    this.entities = [new bird.Bird()];

};

FlappyBird.prototype.scorePlus = function() {

  this.score++;
  this.scoreUi.textContent = this.score;

};

FlappyBird.prototype.scorereset = function() {

  this.score = 0;
  this.scoreUi.textContent = this.score;

};


exports.FlappyBird = FlappyBird;
