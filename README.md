# JS IPFS EventStream

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
