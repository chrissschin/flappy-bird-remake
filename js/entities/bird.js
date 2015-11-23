//entity

var physicsComponent = require("../components/physics/physics");
var graphicsComponent = require("../components/graphics/bird");
var collisionComponent = require("../components/collision/circle");
var flappyBird = require('../flappy_bird');
var pipe = require('../entities/pipe');
var tops = require('../entities/top');
// var settings = require("../settings");
var marker = require('../entities/marker');

var Bird = function(bus) {
    this.eventEmits = bus;
    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.y = 0.5;
    physics.acceleration.y = -2;

    var graphics = new graphicsComponent.BirdGraphicsComponent(this);
    var collision = new collisionComponent.CircleCollisionComponent(this, 0.02);
    collision.onCollision = this.onCollision.bind(this);

    this.components = {
        physics: physics,
        graphics: graphics,
        collision: collision
    };
};

Bird.prototype.onCollision = function(entity) {

    if (entity instanceof pipe.Pipe || entity instanceof tops.Top ) {
      this.eventEmits.emit('crash');
      this.eventEmits.emit('scoreReset');
      this.eventEmits.emit('markercrash', entity);
      this.reset();
    }
    else if (entity instanceof marker.Marker) {
      this.eventEmits.emit('markercrash', entity);
      this.eventEmits.emit('scoreincrease');
    }

};

Bird.prototype.reset = function() {

    this.components.physics.position.y = 0.5;

};

exports.Bird = Bird;
