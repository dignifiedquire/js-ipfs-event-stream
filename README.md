# JS IPFS EventStream

[![](https://img.shields.io/badge/project-IPFS-blue.svg?style=flat-square)](http://ipfs.io/) [![](https://img.shields.io/badge/freejs-%23ipfs-blue.svg?style=flat-square)](http://webchat.freenode.net/?channels=%23ipfs)
[![Dependency Status](https://david-dm.org/dignifiedquire/js-ipfs-event-stream.svg?style=flat-square)](https://david-dm.org/dignifiedquire/js-ipfs-event-stream)
[![Travis CI](https://travis-ci.org/dignifiedquire/js-ipfs-event-stream.svg?branch=master)](https://travis-ci.org/dignifiedquire/js-ipfs-event-stream)


> Get a stream of everything happening on your IFPS node

## Installation

```bash
$ npm i --save ipfs-even-stream
```

## Usage

```js
const createEventStream = require('ipfs-event-stream')

const api = getIPFSAPI()

const event$ = createEventStream(api')

event$.subscribe(event => console.log(event))
```
