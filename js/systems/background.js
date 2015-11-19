var Background = require('../entities/background');

var BackgroundSystem = function(entities, bus){
  this.bus = bus;
  this.entities = entities;
  // this.backgrounds = [];
  this.setup();

};

BackgroundSystem.prototype.setup = function(){

  var canvasWidth = window.innerWidth / window.innerHeight;
  var canvasHeight = window.innerHeight / window.innerHeight;
  var OffCanvasPos = (window.innerWidth - 2) / window.innerHeight;
  var background1 = new Background.background(0, canvasHeight/2, canvasWidth, canvasHeight);
  var background2 = new Background.background(OffCanvasPos, canvasHeight/2, canvasWidth, canvasHeight);
  // this.backgrounds.push(background1, background2);
  this.entities.unshift(background1, background2);

};

BackgroundSystem.prototype.reposition = function(){

  for (var i = 0; i< this.entities.length; i++) {
    var entity = this.entities[i];
    var restart = (window.innerWidth - 2) / window.innerHeight;
    if (entity instanceof Background.background && entity.components.physics.position.x < -restart) {
      entity.components.physics.position.x = restart;
    }

  };

};

BackgroundSystem.prototype.run = function() {
  window.setInterval(this.reposition.bind(this), 1000 / 60);
};

exports.BackgroundSystem = BackgroundSystem;
