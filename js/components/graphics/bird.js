//graphics component

var BirdGraphicsComponent = function(entity) {
  this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function(context){
  console.log("Drawing a bird");

  context.fillStyle = "green"
  context.beginPath();
  context.translate(0, 1.5);
  context.arc(50, 50, 10, 0, 2 * Math.PI);
  context.arc(50, 75, 10, 0, 2 * Math.PI);
  context.arc(50, 100, 10, 0, 2 * Math.PI);
  context.fillRect(50, 125, 20, 50);
  context.fill();

};

exports.BirdGraphicsComponent = BirdGraphicsComponent;
