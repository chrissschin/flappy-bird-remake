var LeftEdgeCollisionComponent = function(entity, size) {
    this.entity = entity;
    this.size = size;
    this.type = 'rect';
};

LeftEdgeCollisionComponent.prototype.collidesWith = function(entity) {
    if (entity.components.collision.type == 'rect') {
        return this.collideRect(entity);
    }
    return false;
};

LeftEdgeCollisionComponent.prototype.collideRect = function(entity) {
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

exports.LeftEdgeCollisionComponent = LeftEdgeCollisionComponent;