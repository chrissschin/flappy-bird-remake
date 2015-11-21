var left = require('../entities/leftedge');

var LeftEdgeSystem = function(entities, bus) {

  this.entities = entities;

  this.canvas = document.getElementById('main-canvas');

  this.interval = null;

  this.eventEmits = bus;
  this.eventEmits.on('crash', this.removePipe.bind(this));
};

// MakeTop.prototype.run = function() {
//   this.interval = window.setInterval(this.tick.bind(this),5000);
// };


LeftEdgeSystem.prototype.run = function() {


    var right =this.canvas.width / this.canvas.height;
    var gapPosition = .5;
    var height = gapPosition - .50;

    var position = {
      x: right + 0.15 / 2,
      y: height / 2
    };
    var size = {
      x: .5,
      y: height
    };

    this.entities.push(new left.LeftEdge(position, size));

    var height = 1 - gapPosition - .2;

    var position = {
      x: right + 0.15 / 2,
      y: 1 - height / 2
    };
    var size = {
      x: .5,
      y: height
    };

    this.entities.push(new left.LeftEdge(position, size));

};

LeftEdgeSystem.prototype.removePipe = function() {
  for (var i = this.entities.length - 1; i >= 0; i-- ) {
    var entity = this.entities[i];
    if (entity instanceof left.LeftEdge) {
      this.entities.splice(i, 1);
    }
  }

  console.log("removing pipes");

}

exports.LeftEdgeSystem = LeftEdgeSystem;
