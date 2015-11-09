//pipe entity

var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require('../components/physics/physics');

var Pipe = function() {
  var physics = new physicsComponent.PhysicsComponent(this);
  physics.position.x = 0.5;
  physics.acceleration.x = -.5;

    var graphics = new graphicsComponent.PipeGraphicsComponent(this);

    this.components = {
        physics: physics,
        graphics: graphics,
    };
};


exports.Pipe = Pipe;
