translate-object
================
[![Build Status](https://travis-ci.org/yamadapc/node-translate-object.svg)](https://travis-ci.org/yamadapc/node-translate-object)
[![devDependency Status](https://david-dm.org/yamadapc/node-translate-object/dev-status.svg)](https://david-dm.org/yamadapc/node-translate-object#info=devDependencies)

Translate an object representation into another based on a map.

## Installation

Install the package with: `npm install translate-object`.

Then:
```javascript
var translate = require('translate-object');
```

It hasn't been tested but should work fine on a browser. You can use it with
browserify :).

## Usage

It works with simple keys:
```javascript
translate({ 'key1': 'something' }, { something: 'value' }),
// => { key1: 'value' }
```

It works with nested keys:
```javascript
translate({ key1: 'something.nested' }, { something: { nested: 'here' } }),
// => { key1: 'here' }
```

It works with array indexes:
```javascript
translate({ key1: 'something.1' }, { something: [1, 'value'] }),
// => { key1: 'value' }
```

It works with mixed input:
```javascript
translate(
  { 'key1': 'something', 'key2': 'nested.severally', key3: 'array.1' },
  { something: 'value', nested: { severally: 'here' }, array: [1, 2] }
),
// => { key1: 'value', key2: 'here', key3: 2 }
```

And the maps may be complex objects too:
```javascript
translate(
  { key1: ['an-array.2', 'an-array.1'],
    key2: { alternative: 'syntax', here: 'hell' } },
  { 'an-array': [1, 'value', 3], syntax: 'ugly', hell: 'bleh' }
),
// => { key1: [ 3, 'value' ], key2: { alternative: 'ugly', here: 'bleh' } }
```

## License
Copyright (c) 2014 Pedro Yamada. Licensed under the MIT license.
