const fs = require('fs')
const util = require('util')
const ast = require('./ast.js')
const sourceRecord = require('./record.js')
const sourceAsset = require('./asset.js')

const commands = ['claim'] // postfix operators
const operators = ['greater than', 'less than', 'equal to'] // binary operators

const content = fs.readFileSync(process.argv[2], 'utf-8')
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

// SET OPERATORS
ast.setOperators(operators)

// SET COMMANDS
ast.setCommands(commands)

// SET REGISTERED PIPELINE
ast.setRecordRegistries(sourceRecord.registries)

// SET REGISTERED ASSETS
ast.setAssetRegistries(sourceAsset.registries)

const contexts = match.groups.context
  .trim()
  .split(/\r?\n/)
  .map(ast.buildPipeline)
  .flat()

// SET RECORDS CONTEXT
contexts.forEach((x) => {
  if (sourceRecord.records[x] !== undefined) {
    ast.setRecord(sourceRecord.records[x])
  } else if (sourceAsset.assets[x] !== undefined) {
    ast.setAsset(sourceAsset.assets[x])
  }
})

let contextNodes = contexts.map(ast.buildContext)

const rules = match.groups.rules
  .trim()
  .split(/\r?\n/)
  .map(ast.buildOperator)
  .map(ast.buildOperand)
  .map(ast.buildRule)

const consequences = match.groups.commands
  .trim()
  .split(/\r?\n/)
  .map(ast.buildAsset)
  .map(ast.buildCommand)

const astObj = {
  version: 1,
  name: process.argv[2],
  content: [],
}

astObj.content.push(
  {
    concept: 'Context',
    values: contextNodes,
  },
  {
    concept: 'Condition',
    values: rules,
  },
  {
    concept: 'Consequence',
    values: consequences,
  },
)
/*
console.log(
  util.inspect(astObj, { showHidden: false, depth: null, colors: true }),
)
*/
console.log(JSON.stringify(astObj))
