'use strict'

const gulp = require('gulp')
const fs = require('fs')

let daemons

gulp.task('daemons:start', done => {
  startDisposableDaemons(d => {
    daemons = d
    done()
  })
})

gulp.task('daemons:stop', done => {
  stopDisposableDaemons(daemons, () => {
    daemons = null
    done()
  })
})

function startDisposableDaemons (callback) {
  const ipfsd = require('ipfsd-ctl')

  const ipfsNodes = {} // a
  const apiAddrs = {} // a

  startIndependentNode(ipfsNodes, apiAddrs, 'a', () => {
    fs.writeFileSync(__dirname + '/../test/tmp-disposable-nodes-addrs.json', JSON.stringify(apiAddrs))
    callback(ipfsNodes)
  })

  function startIndependentNode (ipfsNodes, apiAddrs, key, cb) {
    ipfsd.disposable((err, node) => {
      if (err) {
        throw err
      }

      ipfsNodes[key] = node

      console.log('  ipfs init done - (bootstrap and mdns off) - ' + key)

      ipfsNodes[key].setConfig('Bootstrap', null, err => {
        if (err) {
          throw err
        }
        ipfsNodes[key].setConfig('Discovery', '{}', err => {
          if (err) {
            throw err
          }

          ipfsNodes[key].setConfig('API', '{"HTTPHeaders": {"Access-Control-Allow-Origin": ["*"]}}', err => {
            if (err) {
              throw err
            }

            ipfsNodes[key].startDaemon((err, ignore) => {
              if (err) {
                throw err
              }

              apiAddrs[key] = ipfsNodes[key].apiAddr
              cb()
            })
          })
        })
      })
    })
  }
}

function stopDisposableDaemons (daemons, callback) {
  stopIPFSNode(daemons, 'a', callback)

  function stopIPFSNode (daemons, key, cb) {
    let nodeStopped
    daemons[key].stopDaemon(err => {
      if (err) {
        throw err
      }
      if (!nodeStopped) {
        nodeStopped = true
        cb()
      }
    })
  }
}
