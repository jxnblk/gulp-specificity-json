
var fs = require('fs');
var path = require('path');
var through = require('through2');
var css = require('css');
var specificity = require('specificity');

module.exports = function(options) {

  var options = options || {};

  return through.obj(function(file, encoding, callback) {

    var string = file.contents.toString();

    var stylesheet = css.parse(string).stylesheet;

    var graph = [];

    for (var i = 0; i < stylesheet.rules.length; i++) {
      var rule = stylesheet.rules[i];
      for (var j = 0; j < rule.selectors.length; j++) {
        var selector = rule.selectors[j];
        var result = specificity.calculate(selector)[0];
        var datapoint = {
          index: i,
          selector: selector,
          specificity: result.specificity,
          parts: result.parts
        }
        graph.push(datapoint);
      }
    }

    file.contents = new Buffer(JSON.stringify(graph));

    var filename =  path.basename(file.path, path.extname(file.path)) + '.json';
    file.path = path.join(path.dirname(file.path), filename);

    this.push(file);
    callback();

  });

};

