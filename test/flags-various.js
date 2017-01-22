'use strict';

var expect = require('expect');
var runner = require('gulp-test-tools').gulpRunner;

describe('flag: various', function() {

  it('short opt mixing works', function(done) {
    var gulpfilePath = 'test/fixtures/gulpfiles/gulpfile.js';

    runner({ verbose: false })
      .gulp('-LLp', gulpfilePath, 'test5', 'test6')
      .run(cb);

    function cb(err, stdout) {
      expect(stdout).toEqual('task test5\ntask test6\n');
      done(err);
    }
  });

  it('lookup tasks after indicator --', function(done) {
    runner({ verbose: false })
      .gulp('-LLp', '--', 'test5', 'test6')
      .run(cb);

    function cb(err) {
      expect(err.message).toInclude('Missing argument value: gulpfile');
      done();
    }
  });

  it('accepts negated fields', function(done) {
    var gulpfilePath = 'test/fixtures/gulpfiles/gulpfile.js';

    runner({ verbose: false })
      .gulp('--version', '-LLp', gulpfilePath, '--no-version', 'test5', 'test6')
      .run(cb);

    function cb(err, stdout) {
      expect(stdout).toEqual('task test5\ntask test6\n');
      done(err);
    }
  });

  it('passes task options verbatim', function(done) {
    var gulpfilePath = 'test/fixtures/gulpfiles/gulpfile.js';

    runner({ verbose: false })
      .gulp('-LLp', gulpfilePath,
        'test5', '--help', '--verify=NixClap', '--clap', '--opt1=blah',
        'test6', '-h', '-LLp', '--clap6', '--opt6=blah6', '--clap')
      .run(cb);

    function cb(err, stdout) {
      expect(stdout).toEqual(
        'task test5 --help,--verify=NixClap,--clap,--opt1=blah\n' +
        'task test6 -h,-LLp,--clap6,--opt6=blah6,--clap\n');
      done(err);
    }
  });
});
