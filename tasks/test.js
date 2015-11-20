'use strict'

const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const runSequence = require('run-sequence')

require('./daemons')

gulp.task('test', done => {
  runSequence(
    'test:node',
    done
  )
})

gulp.task('test:node', done => {
  runSequence(
    'daemons:start',
    'mocha',
    'daemons:stop',
    done
  )
})

gulp.task('mocha', () => {
  return gulp.src('test/*.spec.js')
    .pipe($.mocha())
})
