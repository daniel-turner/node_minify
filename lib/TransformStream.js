var Transform = require('stream').Transform,
    util = require('util');

var TransformStream = function() {
  Transform.call(this, {objectMode: true});
};
util.inherits(TransformStream, Transform);

TransformStream.prototype._transform = function(chunk, encoding, callback) {

  chunk = chunk.replace(/\n/g,'');

  this.push(chunk);
  callback();
};

module.exports = TransformStream;