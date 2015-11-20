'use strict'

const ipfsAPI = require('ipfs-api')
const expect = require('chai').expect

const createEventStream = require('../src')
const apiAddrs = require('./tmp-disposable-nodes-addrs.json')

describe('event$', () => {
  let event$

  before(function (done) {
    this.timeout(20000)
    const api = ipfsAPI(apiAddrs.a)
    createEventStream(api, (err, event) => {
      if (err) return done(err)

      event$ = event
      done()
    })
  })

  it('emits an event', () => {
    return event$.first().toPromise().then(event => {
      expect(event).to.be.an('object')
      expect(event.type).to.be.an.instanceof(Array)
      expect(event.timestamp).to.be.an.instanceof(Date)
    })
  })
})
