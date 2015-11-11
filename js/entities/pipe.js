//pipe entity

var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require('../components/physics/physics');


var Pipe = function(position, size) {
  var physics = new physicsComponent.PhysicsComponent(this);
  physics.position = position;
  physics.velocity.x = -.5;

    var graphics = new graphicsComponent.PipeGraphicsComponent(this, size);

    this.components = {
        physics: physics,
        graphics: graphics,
    };
};


exports.Pipe = Pipe;
