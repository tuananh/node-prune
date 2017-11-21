
const assert = require('assert')
const {sep, resolve} = require('path')
const {mkdir, exec} = require('shelljs')
const {files, folders, ignores} = require('./test.json')
const {name} = require('../package.json')
const {readdirSync} = require('fs')

let basePath = resolve(__dirname)

function mkString(path, arr, _cmd) {
  return arr.reduce((prev, curr) => {
    let f = curr
    if (f.startsWith('!')) {
      f = f.replace(/^!/, '')
    }
    f = f.replace(/\*/g, '__')
    f = resolve(path, f)
    let cmd = _cmd
    if (!cmd) {
      if (curr.includes('.')) {
        cmd = 'touch'
      } else {
        cmd = 'mkdir -p'
      }
    }
    return prev + `${cmd} ${f} && `
  }, '')
}

function prepare(path) {
  let cmd = `mkdir -p ${path} && ` +
    mkString(path, files, 'touch') +
    mkString(path, folders, 'mkdir -p') +
    mkString(path, ignores) +
    `ls ${path}`
  exec(cmd)
}

describe(name, function() {
  it('default option', function(done) {
    let p = basePath + '/temp/p1'
    exec(`rm -rf ${p}`)
    let p1 = resolve(p, 'node_modules')
    prepare(p1)
    let cwd = resolve(basePath, 'temp')
    exec(`cd ${p} && ../../../bin/n-prune.js`)
    setTimeout(() => {
      let list = readdirSync(p1)
      assert(list.length === 3)
      assert(list.includes('save1'))
      assert(list.includes('save2'))
      assert(list.includes('__.d.ts'))
      done()
    }, 100)

  })

  it('specific folder and default options', function(done) {
    let p = basePath + '/temp/p2'
    exec(`rm -rf ${p}`)
    let p1 = resolve(p, 'node_modules')
    prepare(p1)
    let cwd = resolve(basePath, 'temp')
    exec(`cd ${p} && cd .. && ../../bin/n-prune.js ${p1}`)
    setTimeout(() => {
      let list = readdirSync(p1)
      assert(list.length === 3)
      assert(list.includes('save1'))
      assert(list.includes('save2'))
      assert(list.includes('__.d.ts'))
      done()
    }, 100)
  })

  it('specific folder and specific options', function(done) {
    let p = basePath + '/temp/p3'
    exec(`rm -rf ${p}`)
    let p1 = resolve(p, 'node_modules')
    prepare(p1)
    let cwd = resolve(basePath, 'temp')
    exec(`cd ${p} && cd .. && ../../bin/n-prune.js ${p1} -c ../test.json`)
    setTimeout(() => {
      let list = readdirSync(p1)
      assert(list.length === 4)
      assert(list.includes('save1'))
      assert(list.includes('save2'))
      assert(list.includes('__.d.ts'))
      assert(list.includes('__.x.ts'))
      assert(readdirSync(p1 + '/save1').length === 1)
      assert(readdirSync(p1 + '/save2').length === 1)
      done()
    }, 100)
  })
})
