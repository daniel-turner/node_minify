var fs = require('fs');
// var util = require('util');
var TransformStream = require('./TransformStream');
var WriteStream = require('./WriteStream');
var ReadStream = require('./ReadStream');
var parseArgs = require('minimist');
// var readstream = null;

var arguments = parseArgs(process.argv.slice(2));
var sourceFilePath = arguments.input;
var outputFilePath = arguments.output;

console.log(arguments);

var transformstream = new TransformStream();
var writestream = fs.createWriteStream(outputFilePath);

fs.exists( sourceFilePath, function(exists) {

  if(exists) {

    var readstream = fs.createReadStream(sourceFilePath,{encoding: 'utf8'});

    readstream.pipe(transformstream).pipe(writestream);

    readstream.on('error', function(error) {

      throw error;
    });

  } else {

    throw new Error("File not found");
  }
});


