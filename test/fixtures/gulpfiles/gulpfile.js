'use strict';

var gulp = require('gulp');

function noop(cb) {
  return cb();
}
function described(cb) {
  cb();
}
function errorFunction() {
  throw new Error('Error!');
}
function anon(cb) {
  return cb();
}
described.description = 'description';

function taskOptions(name) {
  return function(cb) {
    var i;
    var j;
    var argv = process.argv;
    for (i = j = argv.indexOf(name) + 1;
         j < argv.length && argv[j].startsWith('-'); j++) {
    }
    argv = argv.slice(i, j);
    console.log('task ' + name + (argv.length > 0 ? ' ' + argv : ''));
    cb();
  };
}

gulp.task('test1', gulp.series(noop));
gulp.task('test2', gulp.series('test1', noop));
gulp.task('test3', gulp.series(described));
gulp.task('test4', gulp.series(errorFunction, anon));
gulp.task('test5', taskOptions('test5'));
gulp.task('test6', taskOptions('test6'));

gulp.task('default', gulp.series('test1', 'test3', noop));
