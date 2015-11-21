//pipe entity

var PipeGraphicsComponent = function(entity, size) {
  this.entity = entity;
  this.size = size;
  this.pipeImage = new Image();
  this.pipeImage.src = "./images/pipe.png"
};

PipeGraphicsComponent.prototype.draw = function(context) {

  var position = this.entity.components.physics.position;

  context.save();
  context.beginPath();
  context.translate(position.x, position.y);
  context.scale(1, -1);
  context.drawImage(this.pipeImage, -this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
  // context.rect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
  context.fill();
  //context.strokeRect(.5, 1.25, -.1, 0);
  //context.strokeRect(.5, -.25, -.1, 0);
  context.closePath();
  context.restore();



};

exports.PipeGraphicsComponent = PipeGraphicsComponent;
