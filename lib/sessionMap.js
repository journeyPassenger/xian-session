'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SessionMap extends Map {
  constructor(props) {
    super(props);
  }
  get length() {
    return this.size;
  }
  /**
   * 可以对对象处理
   * @param  {String} key   key值，已'.'分割比如'a.b.c'
   * @param  {[type]} value 值
   * @return {[type]}       [description]
   *
   * @example
   * var a = new SMap()
   * a.set('a', {a: 2})
   * a.update('a.a', 4)
   */
  update(key = '', value) {
    const perporties = key.split('.');

    const childUpdate = () => {
      let _key = perporties.shift();
      const target = this.get(_key);

      eval(`target.${perporties.join('.')}=value`);

      this.set(_key, target);
    };

    if (perporties.length > 1) {
      childUpdate();
    } else {
      this.set(key, value);
    }
  }
  /**
   * 查找值对象
   * @param  {String} key   [description]
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  find(key = '', value) {
    const _value = this.values();
    const _result = [];

    for (let i of _value) {
      try {
        const _vl = eval(`i.${key}`);

        if (_underscore2.default.isFunction(value)) {
          value.call(this, _vl) && _result.push(i);
        } else {
          _vl == value && _result.push(i);
        }
      } catch (e) {}
    }

    return _result;
  }
  getValue(key = '') {
    const keys = key.split('.');
    const _key = keys.shift();

    if (!keys.length) {
      return super.get.call(this, _key);
    } else {
      return this._getValue(key);
    }
  }
  _getValue(key, parent, notFirst) {
    const keys = key.split('.');
    const self = this;

    try {
      const _key = keys.shift();
      const _keyValue = notFirst ? parent[_key] : self.get(_key);

      if (keys.length) {
        return self._getValue(keys.join('.'), _keyValue, true);
      } else {
        return _keyValue;
      }
    } catch (e) {
      return null;
    }
  }
}

exports.default = SessionMap;
module.exports = exports['default'];
