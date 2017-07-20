ssion used for xian62

<!-- [![NPM version][npm-image]][npm-url] -->
<!-- [![NPM quality][quality-image]][quality-url] -->
[![build status][travis-image]][travis-url]
<!-- [![Test coverage][codecov-image]][codecov-url] -->
<!-- [![David deps][david-image]][david-url] -->
<!-- [![Known Vulnerabilities][snyk-image]][snyk-url] -->
<!-- [![npm download][download-image]][download-url] -->

[npm-url]: https://npmjs.org/package/egg
[quality-image]: http://npm.packagequality.com/shield/egg.svg?style=flat-square
[quality-url]: http://packagequality.com/#?package=egg
[travis-image]: https://travis-ci.org/journeyPassenger/xian-session.svg?branch=master
[travis-url]: https://travis-ci.org/journeyPassenger/xian-session
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/eggjs/egg
[david-image]: https://img.shields.io/david/eggjs/egg.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg
[snyk-image]: https://snyk.io/test/npm/egg/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg
[download-image]: https://img.shields.io/npm/dm/egg.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg

## 安装

```bash
$ npm install xian-session --save
```

## 示例

```js
import session from 'xian-session'

const initValue = {
    n: 1,
    s: 'string',
    obj: {
        n: 1,
        s: 'alex'
    }
}
const session.set('init', initValue)

session.getValue('init.obj.n') // 1
```

## 开源协议

[MIT](LICENSE)
