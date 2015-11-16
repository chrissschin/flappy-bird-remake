//top entity

var TopGraphicsComponent = function(entity, size) {
  this.entity = entity;
  this.size = size;
};

TopGraphicsComponent.prototype.draw = function(context) {

  var position = this.entity.components.physics.position;

  context.save();
  context.beginPath();
  // context.translate(position.x, position.y);
  context.rect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
  context.fill();
  // context.strokeRect(.5, 1.25, -.1, 0);
  // context.strokeRect(0, 1.49, 1, 1);
  // context.strokeRect(0, -1.49, 1, 1);
  context.closePath();
  context.restore();


};

exports.TopGraphicsComponent = TopGraphicsComponent;
