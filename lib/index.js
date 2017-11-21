const {echo, exec} = require('shelljs')
const {exec: exe} = require('child_process')
let {resolve, sep} = require('path')
const minimatch = require('minimatch')

/**
 * sort make string start with `!` to array end
 * @param {string} a
 * @param {string} b
 */
function sorter(a, b) {
  let an = a.startsWith('!') ? 1 : 0
  let bn = b.startsWith('!') ? 1 : 0
  return an - bn
}

function createStrFromArr(arr) {
  let len = arr.length
  return arr.sort(sorter).reduce((prev, curr, i) => {
    let neg = curr.startsWith('!')
    let name = curr.replace(/^!/, '')
    let param = neg ? 'path' : 'name'
    return prev + ' ' +
      (!i ? '' : (neg ? '-and \\' : '-or \\')) +
      (!i ? '' : '\n') +
      (neg ? '! ' : '') +
      `-${param} ${name} ` +
      (i === len - 1 ? '\\' : '')
  }, '')
}

async function getFileList(cmd) {
  return new Promise((resolve, reject) => {
    exe(cmd, (err, stdout, stderr) => {
      if (err || stderr) {
        return reject(err || stderr)
      }
      resolve(stdout.split(' '))
    })
  })
}

/**
 * create bash cmd string to be executed
 * @param {string} dir path to the folder will be pruned
 * @param {string} configPath path to config.json
 */
async function buildCmd (dir, configPath) {
  let config = require(configPath)
  let {files = [], folders = [], ignores = []} = config
  let path = resolve(dir, '..')
  let reg = new RegExp('^' + path + sep)
  let name = dir.replace(reg, '')
  let filesStr = createStrFromArr(files)
  let foldersStr = createStrFromArr(folders)
  let cmd1 = `
  find ${path} -type d -name ${name} -prune -exec find {} -type f \\( \\
    ${filesStr}
  \\) -print0 \\; | xargs -0
  `
  let files1 = files.length
    ? await getFileList(cmd1)
    : []

  let cmd2 = `find ${path} -type d -name ${name} -prune -exec find {} -type d \\( \\
    ${foldersStr}
  \\) -print0 \\; | xargs -0
  `
  let files2 = folders.length
    ? await getFileList(cmd2)
    : []
  let arr = [
    ...files1,
    ...files2
  ].map(d => d.replace('\n', ''))
  if (ignores.length) {
    arr = arr.filter(str => {
      let r = ignores.reduce((prev, st) => {
        let shouldIgnore = st.includes('/')
          ? str.includes(st)
          : minimatch(str, st, {matchBase: true})
        return prev || shouldIgnore
      }, false)
      return !r
    })
  }
  let cmd = `rm -rf ${arr.join(' ')}`
  return {cmd, path}
}

/**
 * main
 * @param {string} dir path to the folder will be pruned
 * @param {string} configPath path to config.json
 */
module.exports = async (
  dir,
  configPath,
  cwd
) => {
  let {cmd, path} = await buildCmd (dir, configPath)
  echo(`prune folder: ${dir}`)
  echo(`before prune:`)
  exec(`cd ${path} && du -hs`)
  exec(cmd)
  echo(`after prune:`)
  exec(`du -hs && cd ${cwd}`)
}