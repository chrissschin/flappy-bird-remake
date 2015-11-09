//pipe entity

var PipeGraphicsComponent = function(entity) {
  this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function(context) {

  var position = this.entity.components.physics.position;

  context.save();
  context.beginPath();
  context.translate(position.x, position.y);
  context.strokeRect(.5, 1.25, -.1, 0);
  context.strokeRect(.5, -.25, -.1, 0);
  context.closePath();
  context.restore();



};

exports.PipeGraphicsComponent = PipeGraphicsComponent;
