var pipe = require('../entities/pipe');
var marker = require('../entities/marker');

var MakePipes = function(entities, bus) {

  this.entities = entities;

  this.canvas = document.getElementById('main-canvas');

  this.interval = null;

  this.eventEmits = bus;
  this.eventEmits.on('crash', this.removePipes.bind(this));
  this.eventEmits.on('markercrash', this.removeMarker.bind(this));
};

MakePipes.prototype.run = function() {
    //every two seconds new Pipes
  this.interval = window.setInterval(this.tick.bind(this), 2000);
};


MakePipes.prototype.tick = function() {
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

  var pipe1 = new pipe.Pipe(position, size)

  this.entities.push(pipe1);
  this.makeMarker(pipe1);

  var height = 1 - gapPosition - 0.2 / 2;

  var position = {
    x: right + 0.15 / 2,
    y: 1 - height / 2
  };
  var size = {
    x: 0.15,
    y: height
  };

  var pipe2 = new pipe.Pipe(position, size)

  this.entities.push(pipe2);
  this.makeMarker(pipe2);


};

MakePipes.prototype.removePipes = function() {
  for (var i = this.entities.length - 1; i >= 0; i-- ) {
    var entity = this.entities[i];
    if (entity instanceof pipe.Pipe) {
      this.entities.splice(i, 1);
    }
  }
  console.log("removing pipes");
}


MakePipes.prototype.makeMarker = function(pipe){
  var newMarker = new marker.Marker(pipe, this.eventEmits);
  this.entities.push(newMarker);
  pipe.marker = newMarker;


};

MakePipes.prototype.removeMarker = function(marker){
  var index = this.entities.indexOf(marker);
  this.entities.splice(index, 1);

};

exports.MakePipes = MakePipes;
