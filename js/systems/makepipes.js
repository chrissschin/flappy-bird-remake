var pipe = require('../entities/pipe');
var marker = require('../entities/marker');

var MakePipes = function(entities, bus) {

  this.entities = entities;

  this.canvas = document.getElementById('main-canvas');

  this.interval = null;
  this.count = 0;

  this.eventEmits = bus;
  this.eventEmits.on('crash', this.removePipes.bind(this));
  this.eventEmits.on('markercrash', this.removeMarker.bind(this));
};

MakePipes.prototype.run = function() {
    //every two seconds new Pipes
  this.interval = window.setInterval(this.tick.bind(this), 2000);

};

MakePipes.prototype.makeNewPipes = function() {

  var offScreen = this.canvas.width / this.canvas.height / 2;
  var newPipe;
  var size =  {
    x: .075,
    y: .5
  }

  if (parseInt(this.count) % 2 === 0) {
    var position = {
      x: offScreen + .075 / 2,
      y: .5 - .5/2
    };

    newPipe = new pipe.Pipe(position, size, this.eventEmits);

    this.entities.push(newPipe);

  }
  else {
    var position = {
      x: offScreen + .075 / 2,
      y: 1 - .5/2
    };

      newPipe = new pipe.Pipe(position, size, this.eventEmits);

      this.entities.push(newPipe);
  }

  this.makeMarker(newPipe);
  this.count++



};


MakePipes.prototype.tick = function() {

  this.makeNewPipes();

};

MakePipes.prototype.removePipes = function() {
  for (var i = this.entities.length - 1; i >= 0; i-- ) {
    var entity = this.entities[i];
    if (entity instanceof pipe.Pipe) {
      this.removeMarker();
      this.entities.splice(i, 1);

  }
};
  console.log("removing pipes and markers");

};




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
