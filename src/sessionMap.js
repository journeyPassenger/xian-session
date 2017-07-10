export default class extends Map {
  constructor (props) {
    super(props)
  }
  get length () {
    return this.size
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
  update (key = '', value) {
    const perporties = key.split('.')

    const childUpdate = () => {
      let _key = perporties.shift()
      const target = this.get(_key)

      eval(`target.${perporties.join('.')}=value`)

      this.set(_key, target)
    }

    if (perporties.length > 1) {
      childUpdate()
    } else {
      this.set(key, value)
    }
  }
  /**
   * 查找值对象
   * @param  {String} key   [description]
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  find (key = '', value) {
    const _value = this.values()
    const _result = []

    for (let i of _value) {
      try {
        const _vl = eval(`i.${key}`)

        if (_.isFunction(value)) {
          value.call(this, _vl) && _result.push(i)
        } else {
          _vl == value && _result.push(i)
        }
      } catch (e) {}
    }

    return _result
  }
}
