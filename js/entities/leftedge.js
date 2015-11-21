
var graphicsComponent = require("../components/graphics/leftedge");
var physicsComponent = require('../components/physics/physics');
var collisionComponent = require("../components/collision/leftedge");

var LeftEdge = function(position, size) {
  var physics = new physicsComponent.PhysicsComponent(this);
  physics.position = position;
  physics.velocity.x = 0;

  var graphics = new graphicsComponent.LeftEdgeGraphicsComponent(this, size);
  var collision = new collisionComponent.LeftEdgeCollisionComponent(this, size);
  collision.onCollision = this.onCollision.bind(this);

    this.components = {
        physics: physics,
        graphics: graphics,
        collision: collision
    };
};

LeftEdge.prototype.onCollision = function(entity) {
    console.log("left collided with entity:", entity);
    this.pipes

};

exports.LeftEdge = LeftEdge;
