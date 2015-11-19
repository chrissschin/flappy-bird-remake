var physicsComponent = require('../components/physics/physics');
var graphicsComponent = require('../components/graphics/background');

var background = function(positionx, positiony, width, height) {
  var physics = new physicsComponent.PhysicsComponent(this);
  physics.position.x = positionx;
  physics.position.y = positiony;
  physics.velocity.x = -0.2;

  this.width = width;
  this.height = height;


  var graphics = new graphicsComponent.BackgroundGraphicsComponent(this);

  this.components = {
    physics: physics,
    graphics: graphics
  };

};

exports.background = background;
