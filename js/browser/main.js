(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var CircleCollisionComponent = function(entity, radius) {
    this.entity = entity;
    this.radius = radius;
    this.type = 'circle';
};

CircleCollisionComponent.prototype.collidesWith = function(entity) {
  if (entity.components.collision.type == 'circle') {
    return this.collideCircle(entity);
  }
  else if (entity.components.collision.type == 'rect') {
    return this.collideRect(entity);
  }
  return false;

};

CircleCollisionComponent.prototype.collideCircle = function(entity) {
  var positionA = this.entity.components.physics.position;
  var positionB = entity.components.physics.position;

  var radiusA = this.radius;
  var radiusB = entity.components.collision.radius;

  var diff = {x: positionA.x - positionB.x,
              y: positionA.y - positionB.y};

  var distanceSquared = diff.x * diff.x + diff.y * diff.y;
  var radiusSum = radiusA + radiusB;

  return distanceSquared < radiusSum * radiusSum;
};

CircleCollisionComponent.prototype.collideRect = function(entity) {
  var clamp = function(value, low, high) {
      if (value < low) {
          return low;
      }
      if (value > high) {
          return high;
      }
      return value;
  };

  var positionA = this.entity.components.physics.position;
  var positionB = entity.components.physics.position;
  var sizeB = entity.components.collision.size;

  var closest = {
      x: clamp(positionA.x, positionB.x - sizeB.x / 2,
               positionB.x + sizeB.x / 2),
      y: clamp(positionA.y, positionB.y - sizeB.y / 2,
               positionB.y + sizeB.y / 2)
  };


  var radiusA = this.radius;

  var diff = {x: positionA.x - closest.x,
              y: positionA.y - closest.y};

  var distanceSquared = diff.x * diff.x + diff.y * diff.y;
  return distanceSquared < radiusA * radiusA;
};

exports.CircleCollisionComponent = CircleCollisionComponent;

},{}],2:[function(require,module,exports){
var RectCollisionComponent = function(entity, size) {
    this.entity = entity;
    this.size = size;
    this.type = 'rect';
};

RectCollisionComponent.prototype.collidesWith = function(entity) {
    if (entity.components.collision.type == 'circle') {
        return this.collideCircle(entity);
    }
    else if (entity.components.collision.type == 'rect') {
        return this.collideRect(entity);
    }
    return false;
};

RectCollisionComponent.prototype.collideCircle = function(entity) {
    return entity.components.collision.collideRect(this.entity);
};

RectCollisionComponent.prototype.collideRect = function(entity) {
  var positionA = this.entity.components.physics.position;
  var positionB = entity.components.physics.position;

  var sizeA = this.size;
  var sizeB = entity.components.collision.size;

  var leftA = positionA.x - sizeA.x / 2;
  var rightA = positionA.x + sizeA.x / 2;
  var bottomA = positionA.y - sizeA.y / 2;
  var topA = positionA.y + sizeA.y / 2;

  var leftB = positionB.x - sizeB.x / 2;
  var rightB = positionB.x + sizeB.x / 2;
  var bottomB = positionB.y - sizeB.y / 2;
  var topB = positionB.y + sizeB.y / 2;

  return !(leftA > rightB || leftB > rightA ||
           bottomA > topB || bottomB > topA);
};

exports.RectCollisionComponent = RectCollisionComponent;

},{}],3:[function(require,module,exports){
var TopBottomCollisionComponent = function(entity, size) {
    this.entity = entity;
    this.size = size;
    this.type = 'rect';
};

TopBottomCollisionComponent.prototype.collidesWith = function(entity) {
    if (entity.components.collision.type == 'circle') {
        return this.collideCircle(entity);
    }

    return false;
};

TopBottomCollisionComponent.prototype.collideCircle = function(entity) {
    return entity.components.collision.collideRect(this.entity);
};


exports.TopBottomCollisionComponent = TopBottomCollisionComponent;

},{}],4:[function(require,module,exports){
var BackgroundGraphicsComponent = function(entity) {
  this.entity = entity;
  this.backgroundImage = new Image();
  this.backgroundImage.src = "./images/photobackground.png";

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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
//pipe entity

var PipeGraphicsComponent = function(entity, size) {
  this.entity = entity;
  this.size = size;
  this.pipeImage = new Image();
  this.pipeImage.src = "./images/pipe.png"
};

PipeGraphicsComponent.prototype.draw = function(context) {

  var position = this.entity.components.physics.position;

  context.save();
  context.beginPath();
  context.translate(position.x, position.y);
  context.scale(1, -1);
  context.drawImage(this.pipeImage, -this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
  // context.rect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
  context.fill();
  //context.strokeRect(.5, 1.25, -.1, 0);
  //context.strokeRect(.5, -.25, -.1, 0);
  context.closePath();
  context.restore();



};

exports.PipeGraphicsComponent = PipeGraphicsComponent;

},{}],7:[function(require,module,exports){
//top entity

var TopGraphicsComponent = function(entity, size) {
  this.entity = entity;
  this.size = size;
};

TopGraphicsComponent.prototype.draw = function(context) {

  var position = this.entity.components.physics.position;

  context.save();
  context.beginPath();
  // context.translate(position.x, position.y);
  context.rect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
  context.fill();
  // context.strokeRect(.5, 1.25, -.1, 0);
  // context.strokeRect(0, 1.49, 1, 1);
  // context.strokeRect(0, -1.49, 1, 1);
  context.closePath();
  context.restore();


};

exports.TopGraphicsComponent = TopGraphicsComponent;

},{}],8:[function(require,module,exports){
var PhysicsComponent = function(entity){
  this.entity = entity;

  this.position = {
    x: 0,
    y: 0
  };
  this.velocity = {
    x: 0,
    y: 0
  };
  this.acceleration = {
    x: 0,
    y: 0
  };
};

PhysicsComponent.prototype.update = function(delta) {
    this.velocity.x += this.acceleration.x * delta;
    this.velocity.y += this.acceleration.y * delta;

    this.position.x += this.velocity.x * delta;
    this.position.y += this.velocity.y * delta;
};

exports.PhysicsComponent = PhysicsComponent;

},{}],9:[function(require,module,exports){
var physicsComponent = require('../components/physics/physics');
var graphicsComponent = require('../components/graphics/background');

var background = function(positionx, positiony, width, height) {
  var physics = new physicsComponent.PhysicsComponent(this);
  physics.position.x = positionx;
  physics.position.y = positiony;
  physics.velocity.x = -0.2;

  this.width = width;
  this.height = height;


  var graphics = new graphicsComponent.BackgroundGraphicsComponent(this);

  this.components = {
    physics: physics,
    graphics: graphics
  };

};

exports.background = background;

},{"../components/graphics/background":4,"../components/physics/physics":8}],10:[function(require,module,exports){
//entity

var physicsComponent = require("../components/physics/physics");
var graphicsComponent = require("../components/graphics/bird");
var collisionComponent = require("../components/collision/circle");
var flappyBird = require('../flappy_bird');
var pipe = require('../entities/pipe');
var tops = require('../entities/top');
// var settings = require("../settings");
var marker = require('../entities/marker');

var Bird = function(bus) {
    this.eventEmits = bus;
    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.y = 0.5;
    physics.acceleration.y = -2;

    var graphics = new graphicsComponent.BirdGraphicsComponent(this);
    var collision = new collisionComponent.CircleCollisionComponent(this, 0.02);
    collision.onCollision = this.onCollision.bind(this);

    this.components = {
        physics: physics,
        graphics: graphics,
        collision: collision
    };
};

Bird.prototype.onCollision = function(entity) {

    if (entity instanceof pipe.Pipe || entity instanceof tops.Top ) {
      this.eventEmits.emit('crash');
      this.reset();
    }
    else if (entity instanceof marker.Marker) {
      this.eventEmits.emit('markercrash', entity);
      this.eventEmits.emit('scoreincrease');
    }

};

Bird.prototype.reset = function() {

    this.components.physics.position.y = 0.5;

};

exports.Bird = Bird;

},{"../components/collision/circle":1,"../components/graphics/bird":5,"../components/physics/physics":8,"../entities/marker":11,"../entities/pipe":12,"../entities/top":13,"../flappy_bird":14}],11:[function(require,module,exports){
var physicsComponent = require('../components/physics/physics');
var collisionComponent = require("../components/collision/rect");
var Pipe = require('../entities/pipe').Pipe;

var Marker = function(pipe, bus) {
  if(!(pipe && (pipe instanceof Pipe))){ return; }
  this.pipe = pipe;
  this.bus = bus;
  this.width = .01;
  this.height = 1;

  var physics = new physicsComponent.PhysicsComponent(this);

  physics.position.x = this.pipe.components.physics.position.x + this.pipe.width/2 + .01 + this.width/2;
  physics.position.y = 0.5;
  physics.velocity.x = this.pipe.components.physics.velocity.x;

  var collision = new collisionComponent.RectCollisionComponent(this, {x: this.width, y:this.height});

  this.components = {
    physics: physics,
    collision: collision
  };


};

exports.Marker = Marker;

},{"../components/collision/rect":2,"../components/physics/physics":8,"../entities/pipe":12}],12:[function(require,module,exports){
//pipe entity

var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require('../components/physics/physics');
var collisionComponent = require("../components/collision/rect");

var Pipe = function(position, size) {
  var physics = new physicsComponent.PhysicsComponent(this);
  physics.position = position;
  physics.velocity.x = -.5;

  var graphics = new graphicsComponent.PipeGraphicsComponent(this, size);
  var collision = new collisionComponent.RectCollisionComponent(this, size);
  collision.onCollision = this.onCollision.bind(this);

    this.components = {
        physics: physics,
        graphics: graphics,
        collision: collision
    };
};

Pipe.prototype.onCollision = function(entity) {
    console.log("Pipe collided with entity:", entity);
};

exports.Pipe = Pipe;

},{"../components/collision/rect":2,"../components/graphics/pipe":6,"../components/physics/physics":8}],13:[function(require,module,exports){
//top entity

var graphicsComponent = require("../components/graphics/top");
var physicsComponent = require('../components/physics/physics');
var collisionComponent = require("../components/collision/topbottom");

var Top = function(position, size) {
  var physics = new physicsComponent.PhysicsComponent(this);
  physics.position = position;
  physics.velocity.x = 0;

  var graphics = new graphicsComponent.TopGraphicsComponent(this, size);
  var collision = new collisionComponent.TopBottomCollisionComponent(this, size);
  collision.onCollision = this.onCollision.bind(this);

    this.components = {
        physics: physics,
        graphics: graphics,
        collision: collision
    };
};

Top.prototype.onCollision = function(entity) {
    console.log("top collided with entity:", entity);
};

exports.Top = Top;

},{"../components/collision/topbottom":3,"../components/graphics/top":7,"../components/physics/physics":8}],14:[function(require,module,exports){
var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');
var makePipes = require('./systems/makepipes');
var makeTop = require('./systems/maketop');
var backgroundSystem = require('./systems/background');
// var leftEdgeSystem = require('./systems/leftedge');

//event emitter
var events = require('events').EventEmitter;

var bird = require('./entities/bird');
var pipe = require('./entities/pipe');
var tops = require('./entities/top');
// var leftEdge = require('./entities/leftedge');



//log whats going on
// console.log(pipe);
// console.log(bird);
// console.log(graphicsSystem);
// console.log(inputSystem);



var FlappyBird = function() {
    this.eventEmits = new events();
    // this.score = 0;
    // this.scoreUi = document.getElementById('score');

    this.entities = [new bird.Bird(this.eventEmits)];
    this.graphics = new graphicsSystem.GraphicsSystem(this.entities, this.eventEmits);
    this.physics = new physicsSystem.PhysicsSystem(this.entities, this.eventEmits);
    this.inputs = new inputSystem.InputSystem(this.entities, this.eventEmits);
    this.pipes = new makePipes.MakePipes(this.entities, this.eventEmits);
    this.tops = new makeTop.MakeTop(this.entities, this.eventEmits);
    this.backgrounds = new backgroundSystem.BackgroundSystem(this.entities, this.eventEmits);
    // this.leftEdgeCrash = new leftEdgeSystem.LeftEdgeSystem(this.entities, this.eventEmits);
    // this.eventEmits.on('scoreincrease', this.scorePlus.bind(this));

};

FlappyBird.prototype.run = function() {

    this.graphics.run();
    this.physics.run();
    this.inputs.run();
    this.pipes.run();
    this.tops.run();
    this.backgrounds.run();
    // this.leftEdgeCrash.run();

};

FlappyBird.prototype.reset = function() {

    this.entities = [new bird.Bird()];

};

// FlappyBird.prototype.scorePlus = function() {
//
//   this.score++;
//   this.scoreUi.textContent = this.score;
//
// };

exports.FlappyBird = FlappyBird;

},{"./entities/bird":10,"./entities/pipe":12,"./entities/top":13,"./systems/background":16,"./systems/graphics":18,"./systems/input":19,"./systems/makepipes":20,"./systems/maketop":21,"./systems/physics":22,"events":23}],15:[function(require,module,exports){
var flappyBird = require('./flappy_bird');

document.addEventListener('DOMContentLoaded', function() {
    var app = new flappyBird.FlappyBird();
    console.log(flappyBird);
    app.run();
});

},{"./flappy_bird":14}],16:[function(require,module,exports){
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

},{"../entities/background":9}],17:[function(require,module,exports){
var CollisionSystem = function(entities) {
    this.entities = entities;
};

CollisionSystem.prototype.tick = function() {
    for (var i=2; i<this.entities.length; i++) {
        var entityA = this.entities[i];
        if (!'collision' in entityA.components) {
            continue;
        }

        for (var j=i+1; j<this.entities.length; j++) {
            var entityB = this.entities[j];
            if (!'collision' in entityB.components) {
                continue;
            }

            if (!entityA.components.collision.collidesWith(entityB)) {
                continue;
            }

            if (entityA.components.collision.onCollision) {
                entityA.components.collision.onCollision(entityB);
            }

            if (entityB.components.collision.onCollision) {
                entityB.components.collision.onCollision(entityA);
            }
        }
    }
};

exports.CollisionSystem = CollisionSystem;

},{}],18:[function(require,module,exports){
var GraphicsSystem = function(entities) {
  this.entities = entities;
  // Canvas is where we draw
  this.canvas = document.getElementById('main-canvas');
  // Context is what we draw to
  this.context = this.canvas.getContext('2d');
};

GraphicsSystem.prototype.run = function() {
  // Run render loop
  window.requestAnimationFrame(this.tick.bind(this));
};

GraphicsSystem.prototype.tick = function() {
  // Set the canvas to correct size if window is resuzed
  if (this.canvas.width != this.canvas.offsetWidth ||
      this.canvas.height != this.canvas.offsetHeight) {
      this.canvas.width = this.canvas.offsetWidth;
      this.canvas.height = this.canvas.offsetHeight;
  }

  // Clear the canvas
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

  this.context.save();
  this.context.translate(this.canvas.width / 2, this.canvas.height);
  this.context.scale(this.canvas.height, -this.canvas.height);

  //Rendering goes here
  for (var i = 0; i<this.entities.length; i++) {
    var entity = this.entities[i];
    if (!'graphics' in entity.components) {
      continue;
    }

    entity.components.graphics.draw(this.context);
    
  }

  this.context.restore();

  // Continue the render loop
  window.requestAnimationFrame(this.tick.bind(this));
};

exports.GraphicsSystem = GraphicsSystem

},{}],19:[function(require,module,exports){
var InputSystem = function(entities) {
    this.entities = entities;

    // Canvas is where we get input from
    this.canvas = document.getElementById('main-canvas');
};

InputSystem.prototype.run = function() {
    this.canvas.addEventListener('click', this.onClick.bind(this));
};

InputSystem.prototype.onClick = function() {
    var bird = this.entities[2];
    bird.components.physics.velocity.y = 0.6;

};


exports.InputSystem = InputSystem;

},{}],20:[function(require,module,exports){
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

},{"../entities/marker":11,"../entities/pipe":12}],21:[function(require,module,exports){
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
  var height = gapPosition - .5;

  var position = {
    x: right + 0.15 / 2,
    y: height / 2
  };
  var size = {
    x: 3,
    y: height
  };

  this.entities.push(new top.Top(position, size));

  var height = 1 - gapPosition - .5;

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

},{"../entities/top":13}],22:[function(require,module,exports){
var collisionSystem = require("./collision");

var PhysicsSystem = function(entities) {
  this.entities = entities;
  this.collisionSystem = new collisionSystem.CollisionSystem(entities);
};

PhysicsSystem.prototype.run = function() {
  //Run update loop
  window.setInterval(this.tick.bind(this), 1000 /60);
};

PhysicsSystem.prototype.tick = function() {
  for (var i = 0; i < this.entities.length; i++) {
    var entity = this.entities[i];
    if(!'physics' in entity.components) {
      continue;
    }
    entity.components.physics.update(1/60);
  }
  this.collisionSystem.tick();
};

exports.PhysicsSystem = PhysicsSystem;

},{"./collision":17}],23:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}]},{},[15]);
