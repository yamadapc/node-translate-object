'use strict';
/**
 * 'Translates' an object based on a map.
 *
 * @example
 *   translate(
 *     { new_cool_key: 'old.nested.structure' },
 *     { old: { nested: { structure: 'value' } } }
 *   )
 *   // => { new_cool_key: 'value' }
 *
 * @param {Object} map The new key to old paths map.
 * @param {Object} obj The target object.
 * @return {Object} out The new object with renamed keys.
 */

exports = module.exports = function translate(map, obj) {
  var out  = Array.isArray(map) ? [] : {};
  var keys = Object.keys(map);

  for(var i = 0; i < keys.length; i++) {
    var new_key = keys[i];
    var path = map[new_key];

    if((typeof path) !== 'string') {
      out[new_key] = translate(path, obj);
    }
    else {
      out[new_key] = resolveValue(obj, path);
    }
  }

  return out;
};

/**
 * Gives back the value in a `path` key.
 *
 * @example
 *   resolveValue({ something: 'simple' }, 'something')
 *   // => 'simple'
 *   resolveValue({ something: { nested: 'works' } }, 'something.else')
 *   // => 'works'
 *   resolveValue({ something: ['in', 'an', 'array'] }, 'something.2')
 *   // => 'array'
 *
 * @param {Object} obj The target object.
 * @param {String} path The target path.
 * @return {Mixed} value The value at the target path.
 */

var resolveValue = exports.resolveValue = function translate$resolveValue(obj, path) {
  var npath = path.split('.');
  var ret = obj;

  for(var i = 0; i < npath.length; i++) {
    var key = npath[i];
    ret = ret[key];
  }

  return ret;
};
