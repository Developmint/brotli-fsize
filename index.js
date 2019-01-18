'use strict'
const fs = require('fs')
const stream = require('stream')
const zlib = require('zlib')
const duplexer = require('duplexer')
const pify = require('pify')

module.exports = (input, options) => {
  if (!input) {
    return Promise.resolve(0)
  }

  return pify(zlib.BrotliCompress)(input, options)
    .then(data => data.length)
    .catch(_ => 0)
}

module.exports.sync = (input, options) => zlib.brotliCompressSync(input, options).length

module.exports.stream = (options) => {
  const input = new stream.PassThrough()
  const output = new stream.PassThrough()
  const wrapper = duplexer(input, output)

  let brotliSize = 0
  const brotli = zlib.createBrotliCompress(options)
    .on('data', (buf) => {
      brotliSize += buf.length
    })
    .on('error', () => {
      wrapper.brotliSize = 0
    })
    .on('end', () => {
      wrapper.brotliSize = brotliSize
      wrapper.emit('brotli-size', brotliSize)
      output.end()
    })

  input.pipe(brotli)
  input.pipe(output, { end: false })

  return wrapper
}

module.exports.file = (path, options) => {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(path)
    stream.on('error', reject)

    const brotliStream = stream.pipe(module.exports.stream(options))
    brotliStream.on('error', reject)
    brotliStream.on('brotli-size', resolve)
  })
}

module.exports.fileSync = (path, options) => module.exports.sync(fs.readFileSync(path), options)
