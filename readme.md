# brotli-fsize [![Build Status](https://travis-ci.org/manniL/brotli-fsize.svg?branch=master)](https://travis-ci.org/manniL/brotli-fsize)

> Get the brotli-compressed size of a string or buffer


## Install

**Attention:** This module is based on the **native** Brotli support, starting with
Node version **11.7.0**. Therefore it will only work with Node version equal to or higher.

```
$ npm install brotli-fsize
```


## Usage

```js
const brotliSize = require('brotli-fsize');
const text = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.';

console.log(text.length);
//=> 191

console.log(brotliSize.sync(text));
//=> 134
```


## API

### brotliSize(input, [options])

Returns a `Promise` for the size.

### brotliSize.sync(input, [options])

Returns the size.

#### input

Type: `string` `Buffer`

#### options

Type: `Object`

Any [`brotli` option](https://nodejs.org/api/zlib.html#zlib_class_brotlioptions).

### brotliSize.stream([options])

Returns a [`stream.PassThrough`](https://nodejs.org/api/stream.html#stream_class_stream_passthrough). The stream emits a `brotli-fsize` event and has a `brotliSize` property.

### brotliSize.file(path, [options])

Returns a `Promise` for the size of the file.

#### path

Type: `string`

### brotliSize.fileSync(path, [options])

Returns the size of the file.



## License

Inspired by [gzip-size](https://github.com/manniL/gzip-size#readme)


MIT © Developmint (Alexander Lichter)
