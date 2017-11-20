
const assert = require('assert')
const {sep, resolve} = require('path')
const {mkdir, exec} = require('shelljs')
const {files, folders} = require('./test.json')
const {name} = require('../package.json')
const {readdirSync} = require('fs')

let basePath = resolve(__dirname)

function mkString(path, arr, cmd) {
  return arr.reduce((prev, curr) => {
    let f = curr
    if (f.startsWith('!')) {
      f = f.replace(/^!/, '')
    }
    f = f.replace(/\*/g, '__')
    f = resolve(path, f)
    return prev + `${cmd} ${f} && `
  }, '')
}

function prepare(path) {
  let cmd = `mkdir -p ${path} && ` +
    mkString(path, files, 'touch') +
    mkString(path, folders, 'mkdir') +
    'ls'
  console.log(cmd)
  exec(cmd)
}

describe(name, function() {
  it('default option', function(done) {
    let p = basePath + '/temp/p1'
    exec(`rm -rf ${p}`)
    prepare(resolve(p, 'node_modules'))
    let cwd = resolve(basePath, 'temp')
    exec(`cd ${p} && ../../../bin/n-prune.js`)
    assert(1)
    done()
  })
})
