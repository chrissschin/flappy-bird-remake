var top = require('../entities/top');

var MakeTop = function(entities, bus) {

  this.entities = entities;

  this.canvas = document.getElementById('main-canvas');

  this.interval = null;

  this.eventEmits = bus;
  this.eventEmits.on('crash', this.removeTop.bind(this));
};

// MakeTop.prototype.run = function() {
//   this.interval = window.setInterval(this.tick.bind(this),5000);
// };


MakeTop.prototype.run = function() {

  var right = .5 * this.canvas.width / this.canvas.height;
  var gapPosition = .5;
  var height = gapPosition - .50;

  var position = {
    x: right + 0.15 / 2,
    y: height / 2
  };
  var size = {
    x: 3,
    y: height
  };

  this.entities.push(new top.Top(position, size));

  var height = 1 - gapPosition - .50;

  var position = {
    x: right + 0.15 / 2,
    y: 1 - height / 2
  };
  var size = {
    x: 3,
    y: height
  };

  this.entities.push(new top.Top(position, size));

};

MakeTop.prototype.removeTop = function() {
  for (var i = this.entities.length - 1; i >= 0; i-- ) {
    var entity = this.entities[i];
    if (entity instanceof top.Top) {
      this.entities.splice(i, 1);
    }
  }

  console.log("removing pipes");
  this.run();
}

exports.MakeTop = MakeTop;
