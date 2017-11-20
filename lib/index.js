const {exec, echo} = require('shelljs')
let {resolve, sep} = require('path')

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
    console.log(curr, neg)
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

/**
 * create bash cmd string to be executed
 * @param {string} dir path to the folder will be pruned
 * @param {string} configPath path to config.json
 */
async function buildCmd (dir, configPath) {
  let config = require(configPath)
  let {files, folders} = config
  let path = resolve(dir, '..')
  let reg = new RegExp('^' + path + sep)
  let name = dir.replace(reg, '')
  let filesStr = createStrFromArr(files)
  let foldersStr = createStrFromArr(folders)
  let cmd = `
  find ${path} -type d -name ${name} -prune -exec find {} -type f \\( \\
    ${filesStr}
  \\) -print0 \\; | xargs -0 && \\
  find ${path} -type d -name ${name} -prune -exec find {} -type d \\( \\
    ${foldersStr}
  \\) -print0 \\; | xargs -0
  `
  console.log(cmd)
  return {cmd, path}
}

/**
 * main
 * @param {string} dir path to the folder will be pruned
 * @param {string} configPath path to config.json
 */
module.exports = (
  dir,
  configPath,
  cwd
) => {
  let {cmd, path} = buildCmd (dir, configPath)
  echo(`prune folder: ${dir}`)
  echo(`before prune:`)
  exec(`cd ${path} && du -hs`)
  exec(cmd)
  echo(`after prune:`)
  exec(`du -hs && cd ${cwd}`)
}