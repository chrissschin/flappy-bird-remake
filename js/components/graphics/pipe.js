//pipe entity

var PipeGraphicsComponent = function(entity) {
  this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function(context) {

  var position = this.entity.components.physics.position;

  context.save();
  context.beginPath();
  context.translate(position.x, position.y);
  context.strokeRect(0, 0, 2, 0);
  context.fill();
  context.closePath();
  context.restore();



};

exports.PipeGraphicsComponent = PipeGraphicsComponent;
