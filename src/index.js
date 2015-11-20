'use strict'

// const Rx = require('rx')
const RxNode = require('rx-node')

function transform (event$) {
  return event$
  .map(event => {
    return Object.assign({}, event, {
      type: event.event ? event.event.split('.') : ['message'],
      timestamp: event.time ? new Date(event.time) : new Date()
    })
  })
}

function createEventStream (api, done) {
  api.log.tail((err, log$) => {
    if (err) return done(err)

    const event$ = RxNode.fromReadableStream(log$)
    done(null, transform(event$))
  })
}

module.exports = createEventStream
