import test from 'ava'
import Session from '../lib/session.js'

const ss = new Session()
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
  ss.update('a', initValue)
})

test('sessionMap get', t => {
  t.deepEqual(ss.get('a'), initValue)
})

test('sessionMap find', t => {
  t.deepEqual(ss.find('n', 1)[0], initValue)
})

test('sessionMap getKey', t => {
  t.is(ss.getKey('a.obj.s'), 'alex')
})

test('sessionMap update', t => {
  ss.update('a.obj.s', 'erdun')

  t.is(ss.getKey('a.obj.s'), 'erdun')
})
