import test from 'ava'
import SessionMap from '../lib/sessionMap.js'

const sMp = new SessionMap()
const initValue = {
  n: 1,
  obj: {
    s: 'alex',
    n: 2
  },
  arr: [1, 2, 3, 4],
  name: 'bb'
}

test.before(t => {
  sMp.update('a', initValue)
})

test('sessionMap get', t => {
  t.deepEqual(sMp.get('a'), initValue)
})

test('sessionMap find', t => {
  t.deepEqual(sMp.find('n', 1)[0], initValue)
})

test('sessionMap getKey', t => {
  t.is(sMp.getKey('a.obj.s'), 'alex')
})

test('sessionMap update', t => {
  sMp.update('a.obj.s', 'erdun')

  t.is(sMp.getKey('a.obj.s'), 'erdun')
})
