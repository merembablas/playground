const fs = require('fs')
const util = require('util')
const pipeline = require('./service.js')
const operator = require('./operator.js')
const { defaultMaxListeners } = require('events')

const ast = JSON.parse(fs.readFileSync(process.argv[2], 'utf-8'))

const requestData = {
  quest_id: process.argv[2],
  address: '0xBBB',
}

const ruleText = (rule) => {
  let dataLeft = rule.settings.arguments[0].settings
  let dataRight = rule.settings.arguments[1].settings

  dataLeft = dataLeft.name !== undefined ? dataLeft.name : dataLeft.value
  dataRight = dataRight.name !== undefined ? dataRight.name : dataRight.value

  return `Rule ${dataLeft} ${rule.settings.name} ${dataRight}`
}

const log = (msg) => {
  console.log(
    util.inspect(
      {
        info: msg,
      },
      { showHidden: false, depth: null, colors: true },
    ),
  )
}

const call = async (name, filters, requestData) => {
  let result = await pipeline.services[pipeline.attributes[name]][name](
    filters,
    requestData,
  )

  return result
}

const extractOperandValue = async (operand) => {
  let data
  if (operand.concept === 'Attribute') {
    data = await call(
      operand.settings.name,
      operand.settings.filters,
      requestData,
    )
  } else if (operand.concept === 'Number') {
    data = operand.settings.value
  }

  return data
}

const run = async () => {
  for (let i = 0; i < ast.content.length; i++) {
    let data = ast.content[i]
    if (data.concept === 'Context') {
      for (let j = 0; j < data.values.length; j++) {
        let context = data.values[j]
        if (pipeline.registries.includes(context.settings.name)) {
          let result = await pipeline.services[context.settings.name].health()
          if (result.status !== 200) {
            log(`Pipeline ${context.settings.name} not ready`)
            process.exit()
          }

          log(`Pipeline ${context.settings.name} is ready`)
        }
      }
    } else if (data.concept === 'Condition') {
      for (let j = 0; j < data.values.length; j++) {
        let rule = data.values[j]
        if (rule.concept === 'Rule') {
          if (operator.binaryRegistries.includes(rule.settings.name)) {
            let leftOperand = await extractOperandValue(
              rule.settings.arguments[0],
            )
            let rightOperand = await extractOperandValue(
              rule.settings.arguments[1],
            )

            let result = operator.binary[rule.settings.name](
              leftOperand,
              rightOperand,
            )

            if (!result) {
              log(`${ruleText(rule)} is not met`)
              process.exit()
            }

            log(`${ruleText(rule)} is met`)
          }
        }
      }
    } else if (data.concept === 'Consequence') {
      log('Do some task')
    }
  }
}

run()
