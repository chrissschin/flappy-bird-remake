var pipe = require('../entities/pipe');

var MakePipes = function(entities) {
  this.entities = entities;

  this.canvas = document.getElementById('main-canvas');

  this.interval = null;
};

MakePipes.prototype.run = function() {
  this.interval = window.setInterval(this.tick.bind(this), 2000);
};


MakePipes.prototype.tick = function() {
  //every two seconds new Pipes
  var right = 0.5 * this.canvas.width / this.canvas.height;
  var gapPosition = 0.4 + Math.random() * .2;
      // 0.2 is the pipe gap
  var height = gapPosition - 0.2 / 2;

  var position = {
    x: right + 0.15 / 2,
    y: height / 2
  };
  var size = {
    x: 0.15,
    y: height
  };

  this.entities.push(new pipe.Pipe(position, size));

  var height = 1 - gapPosition - 0.2 / 2;

  var position = {
    x: right + 0.15 / 2,
    y: 1 - height / 2
  };
  var size = {
    x: 0.15,
    y: height
  };

  this.entities.push(new pipe.Pipe(position, size));

};

exports.MakePipes = MakePipes;
