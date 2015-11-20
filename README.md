# JS IPFS EventStream

[![](https://img.shields.io/badge/project-IPFS-blue.svg?style=flat-square)](http://ipfs.io/) [![](https://img.shields.io/badge/freejs-%23ipfs-blue.svg?style=flat-square)](http://webchat.freenode.net/?channels=%23ipfs)
[![Dependency Status](https://david-dm.org/Dignifiedquire/js-ipfs-event-stream.svg?style=flat-square)](https://david-dm.org/Dignifiedquire/js-ipfs-event-stream)
[![Build Status](https://img.shields.io/travis/Dignifiedquire/js-ipfs-event-stream/master.svg?style=flat-square)](https://travis-ci.org/Dignifiedquire/js-ipfs-event-stream)


> Get a stream of everything happening on your IFPS node

## Installation

```bash
$ npm i --save ipfs-event-stream
```

## Usage

```js
const createEventStream = require('ipfs-event-stream')

const api = getIPFSAPI()

const event$ = createEventStream(api)

event$.subscribe(event => console.log(event))
```

All events emitted have a `source` property that can be either

* `diag/sys`: Events from an api call to `diag/sys`
* `diag/net`: Events from an api call to `diag/net`
* `log/tail`: Events from the log stream
