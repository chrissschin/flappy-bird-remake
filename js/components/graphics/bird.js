//graphics component

var BirdGraphicsComponent = function(entity) {
  this.entity = entity;
  this.birdImage = new Image();
  this.birdImage.src = "./images/Flappy_Bird.png"
};

BirdGraphicsComponent.prototype.draw = function(context) {
  var position = this.entity.components.physics.position;
  context.save();
  // context.fillStyle ='green';
  context.translate(position.x, position.y);
  context.beginPath();
  context.scale(1, -1);
  context.drawImage(this.birdImage, 0, 0, .1, .1);
  // context.arc(0, 0, 0.02, 0, 2 * Math.PI);
  // context.fill();

  context.closePath();


  context.restore();

};

exports.BirdGraphicsComponent = BirdGraphicsComponent;
