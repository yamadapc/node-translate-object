'use strict'; /* global describe, it */
var assert    = require('assert');
var deepEqual = assert.deepEqual,
    ok        = assert.ok;

var translate = require('..');

describe('translate', function() {
  it('works with non-nested values', function() {
    deepEqual(
      translate({ 'key1': 'something' }, { something: 'value' }),
      { key1: 'value' }
    );
  });

  it('works with nested values', function() {
    deepEqual(
      translate({ key1: 'something.nested' }, { something: { nested: 'here' } }),
      { key1: 'here' }
    );
  });

  it('works with array values', function() {
    deepEqual(
      translate({ key1: 'something.1' }, { something: [1, 'value'] }),
      { key1: 'value' }
    );
  });

  it('works with mixed input', function() {
    deepEqual(
      translate(
        { 'key1': 'something', 'key2': 'nested.severally', key3: 'array.1' },
        { something: 'value', nested: { severally: 'here' }, array: [1, 2] }
      ),
      { key1: 'value', key2: 'here', key3: 2 }
    );
  });

  it('works when the map is a nested object', function() {
    deepEqual(
      translate(
        { key1: ['an-array.2', 'an-array.1'],
          key2: { alternative: 'syntax', here: 'hell' } },
        { 'an-array': [1, 'value', 3], syntax: 'ugly', hell: 'bleh' }
      ),
      { key1: [ 3, 'value' ], key2: { alternative: 'ugly', here: 'bleh' } }
    );
  });

  it('keeps the maps basic types on the output', function() {
    var out = translate({ key1: ['something'] }, { something: 'here' });
    deepEqual(
      out,
      { key1: ['here'] }
    );

    ok(Array.isArray(out.key1));
  });
});
