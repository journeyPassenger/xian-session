'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _sessionMap = require('./sessionMap.js');

var _sessionMap2 = _interopRequireDefault(_sessionMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 功能连接20分钟内未操作，则关闭连接，单个账户最大并发为5
 */
class Session {
  constructor() {
    let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this.max = 1000 || config.max;
    this.timeout = 20 * 60 * 1000 || config.timeout;
    this.session = new _sessionMap2.default();
    this.interval = 5 * 60 * 1000 || config.interval;
    this.error = config.logger || console.error;

    return this;
  }
  get(_key) {
    return this.session.getValue(_key);
  }
  add(_key) {
    let value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    const nowLen = this.session.size;
    const _value = Object.assign({
      createdAt: new Date(),
      close: () => {},
      outDate: this._outDate()
    }, value);

    if (nowLen > this.max) {
      this.error({
        action: 'session 超过最大限制'
      });
    }

    try {
      this.session.set(_key, _value);
    } catch (e) {
      this.error({
        action: 'session 插入失败',
        data: e
      });
    }

    return this;
  }
  update(_key, value) {
    try {
      const id = _key.split('.').shift();
      this.session.update(_key, value);
      this.session.update(`${id}.outDate`, this._outDate());
    } catch (e) {
      this.error({
        action: 'session 更新失败',
        data: e
      });
    }

    return this;
  }
  remove(id) {
    this.session.delete(id);

    return this;
  }
  find(_key, value) {
    return this.session.find(_key, value);
  }
  _outDate() {
    const nowTime = new Date();

    return nowTime.setMinutes(nowTime.getMinutes() + 20);
  }
  get _now() {
    return new Date();
  }
  check() {
    const self = this;
    const timeOutConnections = this.find('outDate', outDate => {
      return outDate > self._now;
    });

    _underscore2.default.each(timeOutConnections, function () {
      let connection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      self.closeConnection(connection.id);
    });
  }
  closeConnection(id) {
    const connection = this.session.get(id);

    connection.close();
  }
  close(id) {
    const _connection = this.session.get(id);

    console.log(Object.assign(_connection, {
      closeAt: new Date()
    }));

    this.remove(id);
  }
}
exports.default = Session;
module.exports = exports['default'];
