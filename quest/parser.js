const fs = require('fs')
const util = require('util')
const ast = require('./ast.js')
const registry = require('./registry.js')

const content = fs.readFileSync(process.argv[2], 'utf-8')

const operands = ['contains of', '>', '<', '==']
const businessRules = ['claim']

const reg = /context(?<context>[\s\S.]+)if(?<rules>[\s\S.]+)then(?<commands>[\s\S.]+)/gm

const match = reg.exec(content)

if (
  !match ||
  match.groups.context === undefined ||
  match.groups.rules === undefined
) {
  console.error('keywords "context", "if", and "then" are mandatory')
  process.exit()
}

const contexts = match.groups.context
  .trim()
  .split(/\r?\n/)
  .map((line) => {
    line = line.trim()
    if (!line in registry.services) {
      console.error(`Pipeline ${line} not found`)
      process.exit()
    }

    return line.trim().split(/\s+/)
  })
  .flat()
  .map(ast.addPipeline)

const rules = match.groups.rules
  .trim()
  .split(/\r?\n/)
  .map((line) => {
    line = line.trim()

    let operandFound
    let exprLeft
    let exprRight
    for (let i = 0; i < operands.length; i++) {
      if (line.includes(operands[i])) {
        const args = line.split(operands[i])
        operandFound = operands[i].trim()
        exprLeft = args[0].trim()
        exprRight = args[1].trim()
        return { operand: operandFound, exprLeft, exprRight }
      }
    }
  })
  .map(ast.addRule)

const commands = match.groups.commands
  .trim()
  .split(/\r?\n/)
  .map((line) => {
    line = line.trim()

    let commandFound
    for (let i = 0; i < businessRules.length; i++) {
      if (line.includes(businessRules[i])) {
        let args = line.split(/(\s+)/).filter((x) => x.trim() !== '')
        commandFound = args.shift().trim()
        return { command: commandFound, arguments: args }
      }
    }
  })
  .map(ast.addCommand)

const astObj = {
  version: 1,
  name: process.argv[2],
  content: [],
}

astObj.content.push(
  {
    concept: 'Context',
    values: contexts,
  },
  {
    concept: 'Condition',
    values: rules,
  },
  {
    concept: 'Consequence',
    values: commands,
  },
)
/*
console.log(
  util.inspect(astObj, { showHidden: false, depth: null, colors: true }),
)
*/

console.log(JSON.stringify(astObj))
