'use strict';

var expect = require('expect');
var runner = require('gulp-test-tools').gulpRunner;

var path = require('path');
var fs = require('fs');

var outputFile = path.join(__dirname, 'expected/flags-help.txt');
var outputText = fs.readFileSync(outputFile, 'utf8').trim();

describe('flag: --help', function() {

  it('shows help using --help', function(done) {
    runner({ verbose: false })
      .gulp('--help', '--cwd ./test/fixtures/gulpfiles')
      .run(cb);

    function cb(err, stdout) {
      expect(stdout.trim()).toEqual(outputText);
      done(err);
    }
  });

  it('shows help using short --h', function(done) {
    runner({ verbose: false })
      .gulp('--h', '--cwd ./test/fixtures/gulpfiles')
      .run(cb);

    function cb(err, stdout) {
      expect(stdout.trim()).toEqual(outputText);
      done(err);
    }
  });

  it('shows help using short -h', function(done) {
    runner({ verbose: false })
      .gulp('-h', '--cwd ./test/fixtures/gulpfiles')
      .run(cb);

    function cb(err, stdout) {
      expect(stdout.trim()).toEqual(outputText);
      done(err);
    }
  });

});
