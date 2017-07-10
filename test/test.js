const Session = require('../lib/sessionMap.js')

const sMp = new Session()
const initValue = {
  n: 1,
  obj: {
    s: 'alex',
    n: 2
  },
  arr: [1, 2, 3, 4],
  bb: 'bb'
}
sMp.update('a', initValue)
sMp.update('b', 11)

var a = sMp.find('n', 1)

console.log(sMp.getKey('a.n'))
