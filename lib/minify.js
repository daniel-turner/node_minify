var fs = require('fs');
var TransformStream = require('./TransformStream');
var parseArgs = require('minimist');

var arguments = parseArgs(process.argv.slice(2));
var sourceFilePath = arguments.input;
var outputFilePath = arguments.output;

if(!arguments.hasOwnProperty("input") || !arguments.hasOwnProperty("output")) {

  throw new Error("Invalid flags");
}

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


