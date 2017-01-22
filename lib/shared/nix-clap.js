'use strict';

var chalk = require('chalk');
var cliOptions = require('./cliOptions');
var Yargs = require('yargs');

var usage =
  '\n' + chalk.bold('Usage:') +
  ' gulp ' + chalk.blue('[flags] [--]') +
  chalk.green(' [task [task options] task [task options] ...]');

function nixClap(argv, start) {
  var parser = Yargs.usage(usage, cliOptions);

  function getOpt(name) {
    if (cliOptions.hasOwnProperty(name)) {
      return cliOptions[name];
    }

    var k = Object.keys(cliOptions).find(function(o) {
      return cliOptions[o].alias === name;
    });

    return cliOptions[k];
  }

  function takeNextArg(x) {
    var arg = argv[x];
    var next = x + 1 < argv.length && argv[x + 1] || '';

    if (arg.indexOf('=') > 0 || next.startsWith('-')) {
      return false;
    }

    var opt;
    if (!arg.startsWith('--')) {
      opt = getOpt(arg.substr(arg.length - 1));
    } else if (arg.startsWith('--no-')) {
      return false;
    } else {
      opt = getOpt(arg.substr(2));
    }

    return opt && !(opt.type === 'boolean' ||
      opt.type === 'count' || opt.count !== undefined);
  }

  function findCutOff() {
    for (var i = start; i < argv.length && argv[i] !== '--'; i++) {
      if (!argv[i].startsWith('-')) {
        return i;
      }

      if (takeNextArg(i)) {
        i++;
      }
    }

    return argv.length;
  }

  var cutOff = findCutOff();
  var cliArgs = argv.slice(start, cutOff);
  var taskArgs = argv.slice(cutOff);

  return {
    cutOff: cutOff, cliArgs: cliArgs, taskArgs: taskArgs,
    parser: parser,
    opts: parser.parse(cliArgs),
    tasks: taskArgs.map(function(x) {
      return x.startsWith('-') ? null : x;
    }).filter(function(x) {
      return x;
    }),
  };
}

module.exports = nixClap;
