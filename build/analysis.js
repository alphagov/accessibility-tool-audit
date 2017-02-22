var fs = require('fs'),
    path = require('path'),
    _ = require('lodash');


var paths = {
  testsJson: path.join(__dirname, '../tests.json'),
  analysisJson: path.join(__dirname, '../analysis.json')
};

var resultTypes = [
  'notfound',
  'error',
  'warning',
  'manual',
  'different',
  'identified',
  'wrong',
  'false-positive' 
];

var toolNames = [
  'google',
  'asqatasun',
  'tenon',
  'wave',
  'sortsite',
  'axe',
  'codesniffer',
  'achecker',
  'eiii',
  'nu'
];

function analyse(){
  var testsFile = fs.readFileSync(paths.testsJson).toString();
  var tests = JSON.parse(testsFile);

  var tool = {};
  var test = {};
  var percent = {};

  // Priming the tools array
  tool = _.reduce(toolNames, function (a, b){
    a[b] = _.reduce(resultTypes, (c, d) => { c[d] = 0; return c; }, {});
    return a;
  }, {});

  for( catname in tests ){
    for( testname in tests[catname] ){
      var resObj = tests[catname][testname]["results"];

      for( toolName in resObj ){
        tool[toolName][resObj[toolName]]++;
      }
    }
  }

  fs.writeFileSync(paths.analysisJson, JSON.stringify(tool,'',2), 'utf8');
}

module.exports = {
  analyse: analyse,
  resultTypes: resultTypes,
  toolNames: toolNames
}
