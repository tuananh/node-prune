#!/usr/bin/env node

let act = require('../lib')
let {resolve} = require('path')
let program = require('commander')
let cwd = process.cwd()

program
  .version(require('../package.json').version)
  .description('prune unwanted files and folders')
  .option('-c, --config', 'sepcific config file')
  .usage('[dir]')
  .parse(process.argv)

let configPath = resolve(__dirname, '../default.json')

let name = 'node_modules'
let {rawArgs} = program
console.log(rawArgs)
for(let i = 2, len = rawArgs.length;i < len;i ++) {
  let name = arr[i]
  if(name === '-c') {
    configPath = resolve(arr[i+1])
    rawArgs.splice(i, 2)
    break
  }
}
console.log(program.args)
let dir = program.args.shift() || resolve(cwd, name)

act(
  dir,
  configPath,
  cwd
)