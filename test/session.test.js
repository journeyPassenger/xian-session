import test from 'ava'

import session from '../lib/'

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
  session.update('a', initValue)
})

test('session get', t => {
  t.deepEqual(session.get('a'), initValue)
})

test('session find', t => {
  t.deepEqual(session.find('n', 1)[0], initValue)
})

test('session update', t => {
  session.update('a.obj.s', 'erdun')

  t.is(session.get('a.obj.s'), 'erdun')
})
