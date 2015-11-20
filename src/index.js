'use strict'

const Rx = require('rx')
const RxNode = require('rx-node')

const config = {
  pollInterval: 500
}

function createDiagStream (api, type) {
  const diag = Rx.Observable.fromNodeCallback(api.diag[type])

  return Rx.Observable.timer(config.pollInterval, config.pollInterval)
  .flatMap(() => diag())
  .map(obj => {
    return Object.assign(obj, {
      source: `diag/${type}`
    })
  })
}

function createLogStream (api) {
  const tail = Rx.Observable.fromNodeCallback(api.log.tail)

  return tail()
  .flatMap(log => {
    return RxNode.fromReadableStream(log)
  })
  .map(event => {
    return Object.assign(event, {
      type: event.event ? event.event.split('.') : ['message'],
      timestamp: event.time ? new Date(event.time) : new Date(),
      source: 'log/tail'
    })
  })
}

function createEventStream (api) {
  return createLogStream(api)
  .merge(createDiagStream(api, 'net'))
  .merge(createDiagStream(api, 'sys'))
}

module.exports = createEventStream
