'use strict'

const ipfsAPI = require('ipfs-api')
const expect = require('chai').expect

const createEventStream = require('../src')
const apiAddrs = require('./tmp-disposable-nodes-addrs.json')

describe('event$', () => {
  let event$

  before(function () {
    const api = ipfsAPI(apiAddrs.a)
    event$ = createEventStream(api)
  })

  it('emits log/tail events', function () {
    this.timeout(20000)

    return event$
    .filter(event => event.source === 'log/tail')
    .first()
    .toPromise()
    .then(event => {
      expect(event).to.be.an('object')
      expect(event.type).to.be.an.instanceof(Array)
      expect(event.timestamp).to.be.an.instanceof(Date)
    })
  })

  it('emits diag/sys events', function () {
    this.timeout(20000)

    return event$
    .filter(event => event.source === 'diag/sys')
    .first()
    .toPromise()
    .then(event => {
      expect(event).to.be.an('object')
    })
  })

  it('emits diag/net events', function () {
    this.timeout(20000)

    return event$
    .filter(event => event.source === 'diag/net')
    .first()
    .toPromise()
    .then(event => {
      expect(event).to.be.an('object')
    })
  })
})
