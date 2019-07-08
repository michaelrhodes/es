var babel = require('babel-core')
var through = require('through2')
var json = /\.json$/i

var plugins = [
  require('babel-plugin-transform-es2015-arrow-functions'),
  require('babel-plugin-transform-es2015-shorthand-properties'),
  require('babel-plugin-transform-es2015-template-literals')
]

module.exports = es53

function es53 (filename, opts) {
  var chunks = []

  return json.test(filename) ?
    through() :
    through(write, end)

  function write (buf, enc, next) {
    chunks.push(buf)
    next()
  }

  function end () {
    try {
      var src = Buffer.concat(chunks).toString('utf8')
      var res = babel.transform(src, {
        compact: false,
        filename: filename,
        plugins: plugins,
        sourceMaps: opts._flags.debug ?
          'inline' : false
      })
    }
    catch (err) {
      this.emit('error', err)
      return
    }
    this.push(res.code)
    this.push(null)
  }
}
