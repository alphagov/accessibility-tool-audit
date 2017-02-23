var nunjucks = require('nunjucks'),
    fs = require('fs'),
    path = require('path'),
    analysis = require('./analysis');

var paths = {
  testsJson: path.join(__dirname, '../tests.json'),
  analysisJson: path.join(__dirname, '../analysis.json'),
  templates: path.join(__dirname, 'templates'),
  outPath: path.join(__dirname, '../'),
  out: fname => path.join(paths.outPath, fname)
};

var resultsCopy = {
  "error": "issue found",
  "warning": "warning only",
  "different": "different issue found",
  "notfound": "not found",
  "identified": "noticed but not a fail",
  "manual": "user to check",
  "wrong": "wrong issue reported",
  "false-positive": "unrelated issue"
};

function getFilename( catname, testname ){
    var filename = [catname.toLowerCase(), testname.toLowerCase()]
                      .join('-')
                      .replace(/[^a-z0-9\-\ ]/, '')
                      .replace('/', ' ')
                      .replace(/\s+/g, '-')
                      .replace(/-+/g, '-');

    return filename;
}

function processExample( example ){
  if( example.indexOf('images') > -1 ){
    example = example.replace('images/', 'assets/test_images/');
  }

  return example;
}

function generateFiles(){
  var testsFile = fs.readFileSync(paths.testsJson).toString();
  var tests = JSON.parse(testsFile);

  analysis.analyse();

  nunjucks.configure(paths.templates);

  // Generate index
  var indexout = nunjucks.render('index.html', {
    tests: tests,
    getFilename: getFilename
  });
  fs.writeFileSync(paths.out('index.html'), indexout, 'utf8');

  // Generate test cases

  var indexout = nunjucks.render('test-cases.html', {
    tests: tests,
    getFilename: getFilename
  });
  fs.writeFileSync(paths.out('test-cases.html'), indexout, 'utf8');

  // Generate individual tests

  for( catname in tests ){
    for( testname in tests[catname] ){
      var testObj = tests[catname][testname];

      var filename = getFilename( catname, testname );

      var filecontent = nunjucks.render('single-test.html', {
        testname: testname,
        example: processExample(testObj.example)
      });

      fs.writeFileSync(paths.out('tests/' + filename + ".html"), filecontent, 'utf8');    
    }
  }

  var analysisResults = require(paths.analysisJson);

  // Generate results
  var resultsout = nunjucks.render('results.html', {
    tests: tests, 
    rcopy: resultsCopy,
    analysis: analysisResults,
    resultTypes: analysis.resultTypes,
    toolNames: analysis.toolNames
  });
  fs.writeFileSync(paths.out('results.html'), resultsout, 'utf8');
}

module.exports = {
  generate: generateFiles
}