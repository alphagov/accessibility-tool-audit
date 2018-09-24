let fs = require('fs'),
    path = require('path'),
    _ = require('lodash');


let paths = {
  testsJson: path.join(__dirname, '../tests.json'),
  analysisJson: path.join(__dirname, '../analysis.json')
};

let testsFile = fs.readFileSync(paths.testsJson).toString();
let tests = JSON.parse(testsFile);
// linear list of all tests
let testList = _.flatten(_.map(_.values(tests), x => _.keys(x)));

let resultTypes = [
  'notfound',
  'error',
  'error_paid',
  'warning',
  'manual',
  'identified'
];

let toolNames = [
  'google',
  'tenon',
  'wave',
  'codesniffer',
  'axe',
  'asqatasun',
  'sortsite',
  'eiii',
  'achecker',
  'nu',
  'siteimprove',
  'fae',
  'aslint'
];

let analysis = {};

function analyse(){
  let tool = {};
  let detectable = [];

  // Priming the tools array
  tool = _.reduce(toolNames, function (a, b){
    a[b] = _.reduce(resultTypes, (c, d) => { c[d] = 0; return c; }, {});
    return a;
  }, {});

  for(let catname in tests ){
    for(let testname in tests[catname] ){
      let resObj = tests[catname][testname]["results"];

      for(let toolName in resObj ){
        tool[toolName][resObj[toolName]]++;
      }

      // Test is detectable by at least one tool
      let canDetect = _.without(
        _.values(resObj),
        'notfound',
        'identified'
      );

      if( canDetect.length > 0 ){
        detectable.push(testname);
      }
    }
  }

  analysis.counts = tool;

  analysis.totals = {
    total: testList.length,
    detectable: detectable.length,
    undetectable: testList.length - detectable.length
  }

  analysis.percentages = {
    detectable: _.round(analysis.totals.detectable / analysis.totals.total * 100),
    tools: {}
  }

  for( tool in analysis.counts ){
    let t = analysis.counts[tool];

    analysis.percentages.tools[tool] = {
      detectable: {
        "error_warning": _.round((t.error + t.error_paid + t.warning) / analysis.totals.detectable * 100),
        "error_warning_manual": _.round((t.error + t.error_paid + t.warning + t.manual) / analysis.totals.detectable * 100)
      },
      total: {
        "error_warning": _.round((t.error + t.error_paid + t.warning) / analysis.totals.total * 100),
        "error_warning_manual": _.round((t.error + t.error_paid + t.warning + t.manual) / analysis.totals.total * 100)
      }
    }
  }

  // [ [ 'google', 17 ], [ 'tenon', 37 ], ... ]
  let tr = _.map(_.get(analysis, 'percentages.tools'), (x,y) => [y, x.total.error_warning, x.total.error_warning_manual] );
  tr = tr.sort( (a, b) => b[1] - a[1] );
  let tr_ew = tr.map(function (val, index){
    return {
      position: index + 1,
      name: val[0],
      error_warning: val[1],
      error_warning_manual: val[2],
    }
  });

  tr = tr.sort( (a, b) => b[2] - a[2] );
  let tr_ewm = tr.map(function (val, index){
    return {
      position: index + 1,
      name: val[0],
      error_warning: val[1],
      error_warning_manual: val[2],
    }
  });

  analysis.scoreboard = {};
  analysis.scoreboard.by_error_warning = tr_ew;
  analysis.scoreboard.by_error_warning_manual = tr_ewm;

  fs.writeFileSync(paths.analysisJson, JSON.stringify(analysis,'',2), 'utf8');
}

module.exports = {
  analyse: analyse,
  resultTypes: resultTypes,
  toolNames: toolNames
}
