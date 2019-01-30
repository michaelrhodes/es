var browserify = require('browserify')
var es52 = require('./')

browserify()
  .add('example.js')
  .transform(es52)
  .bundle(function (err, code) {
    console.assert(err === null, 'it doesn’t blow up')

    console.assert(!contains(code, '=>'), 'it replaces arrow functions')
    console.assert(contains(code, 'function'), 'with regular functions')

    console.assert(!contains(code, '{ v, gt }'), 'it replaces short objects')
    console.assert(contains(code, '{ v: v, gt: gt }'), 'with regular objects')
  })

function contains (n, h) {
  return String(n).indexOf(String(h)) !== -1
}
