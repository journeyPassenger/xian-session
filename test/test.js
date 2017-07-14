const session = require('../lib/')

const initValue = {
  n: 1,
  obj: {
    s: 'alex',
    n: 2
  },
  arr: [1, 2, 3, 4],
  name: 'bb'
}

session.update('a', initValue)

console.log(session.get('a.n'))
