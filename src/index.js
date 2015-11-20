'use strict'

// const Rx = require('rx')
const RxNode = require('rx-node')

function createEventStream (api, done) {
  api.log.tail((err, log$) => {
    if (err) return done(err)

    const events$ = RxNode.fromReadableStream(log$)
    done(null, events$)
  })
}

module.exports = createEventStream
