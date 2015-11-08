//graphics component

var BirdGraphicsComponent = function(entity) {
  this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function(context) {
  var position = {x: 0, y: 0.5};

  context.save();
  context.fillStyle ='green';
  context.translate(position.x, position.y);
  context.beginPath();
  context.arc(0, 0, 0.1, 0, 2 * Math.PI);
  context.fill();
  context.closePath();
  context.restore();

};

exports.BirdGraphicsComponent = BirdGraphicsComponent;
