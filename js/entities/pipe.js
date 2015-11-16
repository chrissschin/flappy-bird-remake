//pipe entity

var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require('../components/physics/physics');
var collisionComponent = require("../components/collision/rect");

var Pipe = function(position, size) {
  var physics = new physicsComponent.PhysicsComponent(this);
  physics.position = position;
  physics.velocity.x = -.5;

  var graphics = new graphicsComponent.PipeGraphicsComponent(this, size);
  var collision = new collisionComponent.RectCollisionComponent(this, size);
  collision.onCollision = this.onCollision.bind(this);

    this.components = {
        physics: physics,
        graphics: graphics,
        collision: collision
    };
};

Pipe.prototype.onCollision = function(entity) {
    console.log("Bird collided with entity:", entity);
};

exports.Pipe = Pipe;
