var physicsComponent = require('../components/physics/physics');
var collisionComponent = require("../components/collision/rect");
var Pipe = require('../entities/pipe').Pipe;

var Marker = function(pipe, bus) {
  if(!(pipe && (pipe instanceof Pipe))){ return; }
  this.pipe = pipe;
  this.bus = bus;
  this.width = .01;
  this.height = 1;

  var physics = new physicsComponent.PhysicsComponent(this);

  physics.position.x = this.pipe.components.physics.position.x + .15;
  physics.position.y = 0.5;
  physics.velocity.x = this.pipe.components.physics.velocity.x;

  var collision = new collisionComponent.RectCollisionComponent(this, {x: this.width, y:this.height});

  this.components = {
    physics: physics,
    collision: collision
  };


};

exports.Marker = Marker;
