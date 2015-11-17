

var graphicsComponent = require("../components/graphics/leftedge");
var physicsComponent = require('../components/physics/physics');
var collisionComponent = require("../components/collision/leftedge");

var LeftEdge = function(position, size) {
  var physics = new physicsComponent.PhysicsComponent(this);
  physics.position = position;
  physics.velocity.x = 0;

  var graphics = new graphicsComponent.TopGraphicsComponent(this, size);
  var collision = new collisionComponent.TopBottomCollisionComponent(this, size);
  collision.onCollision = this.onCollision.bind(this);

    this.components = {
        physics: physics,
        graphics: graphics,
        collision: collision
    };
};

Top.prototype.onCollision = function(entity) {
    console.log("left collided with entity:", entity);
};

exports.LeftEdge = LeftEdge;
