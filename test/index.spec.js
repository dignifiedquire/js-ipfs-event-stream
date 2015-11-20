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

  it('emits event', done => {
    event$.first().subscribe(obj => {
      expect(obj).to.be.an.object
      done()
    })
  })
})
