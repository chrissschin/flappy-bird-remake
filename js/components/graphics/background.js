var BackgroundGraphicsComponent = function(entity) {
  this.entity = entity;
  this.backgroundImage = new Image();
  this.backgroundImage.src = "./images/photobackground.jpeg";

};

BackgroundGraphicsComponent.prototype.draw = function(context) {
  var position = this.entity.components.physics.position;

  context.save();
  context.translate(position.x, position.y);
  context.scale(1, -1);
  context.drawImage(this.backgroundImage, 0, 0, this.backgroundImage.width, this.backgroundImage.height, -this.entity.width / 2, -0.5, this.entity.width, this.entity.height);

  context.restore();

}

exports.BackgroundGraphicsComponent = BackgroundGraphicsComponent;
