import _ from 'underscore'

import SMap from './seseeionMap'
import { logger } from '../'

/**
 * 功能连接20分钟内未操作，则关闭连接，单个账户最大并发为5
 */
export default class Session {
  constructor (config = {}) {
    this.max = 1000 || config.max
    this.timeout = 20 * 60 * 1000 || config.timeout
    this.session = new SMap()
    this.interval = 5 * 60 * 1000 || config.interval
  }
  add (_key, value = {}) {
    const nowLen = this.session.size
    const _value = Object.assign({
      createdAt: new Date(),
      close: () => {},
      outDate: this._outDate()
    }, value)

    if (nowLen > this.max) {
      logger.errorCom.insert({
        action: 'session 超过最大限制'
      })
    }

    try {
      this.session.set(_key, _value)
    } catch (e) {
      logger.errorCom.insert({
        action: 'session 插入失败',
        data: e
      })
    }
  }
  update (_key, value) {
    try {
      const id = _key.split('.').shift()
      this.session.update(_key, value)
      this.session.update(`${id}.outDate`, this._outDate())
    } catch (e) {
      logger.errorCom.insert({
        action: 'session 更新失败',
        data: e
      })
    }
  }
  remove (id) {
    this.session.delete(id)
  }
  find (_key, value) {
    return this.session.find(_key, value)
  }
  _outDate () {
    const nowTime = new Date()

    return nowTime.setMinutes(nowTime.getMinutes() + 20)
  }
  get _now () {
    return new Date()
  }
  check () {
    const self = this
    const timeOutConnections = this.find('outDate', outDate => {
      return outDate > self._now
    })

    _.each(timeOutConnections, (connection = {}) => {
      self.closeConnection(connection.id)
    })
  }
  closeConnection (id) {
    const connection = this.session.get(id)

    connection.close()
  }
  close (id) {
    const _connection = this.session.get(id)

    console.log(Object.assign(_connection, {
      closeAt: new Date()
    }))

    this.remove(id)
  }
}
