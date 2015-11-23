//graphics component

var BirdGraphicsComponent = function(entity) {
  this.entity = entity;
  this.birdImage = new Image();
  this.birdImage.src = "./images/Flappy_Bird.png"
};

BirdGraphicsComponent.prototype.draw = function(context) {
  var position = this.entity.components.physics.position;
  context.save();
  context.translate(position.x, position.y);
  context.beginPath();
  context.scale(1, -1);
  context.drawImage(this.birdImage, 0, 0, .1, .1);
  context.closePath();


  context.restore();

};

exports.BirdGraphicsComponent = BirdGraphicsComponent;
