#!/usr/bin/env node

let act = require('../lib')
let {resolve} = require('path')
let program = require('commander')
let cwd = process.cwd()

program
  .version(require('../package.json').version)
  .description('prune unwanted files and folders, default target is ./node_modules')
  .option('-c, --config', 'sepcific config file, visit https://github.com/zxdong262/n-prune for config file detail')
  .usage('[dir]')
  .parse(process.argv)

let configPath = resolve(__dirname, '../default.json')

let name = 'node_modules'
let {rawArgs} = program
for(let i = 2, len = rawArgs.length;i < len;i ++) {
  let name = rawArgs[i]
  if(name === '-c') {
    configPath = resolve(rawArgs[i+1])
    rawArgs.splice(i, 2)
    break
  }
}
let dir = program.args.shift() || resolve(cwd, name)

act(
  dir,
  configPath,
  cwd
)