const record = require('./record.js')

module.exports.addPipeline = (value) => {
  return {
    concept: 'Pipeline',
    settings: {
      name: value,
    },
  }
}

module.exports.addRule = (value) => {
  let exprLeft
  if (!isNaN(value.exprLeft)) {
    exprLeft = JSON.parse(JSON.stringify(record.attributes.Number))
    exprLeft.settings.value = value.exprLeft
  } else {
    exprLeft = record.attributes[value.exprLeft]
  }

  let exprRight
  if (!isNaN(value.exprRight)) {
    exprRight = JSON.parse(JSON.stringify(record.attributes.Number))
    exprRight.settings.value = value.exprRight
  } else {
    exprRight = record.attributes[value.exprRight]
  }

  return {
    concept: 'Rule',
    settings: {
      name: value.operand,
      arguments: [exprLeft, exprRight],
    },
  }
}

module.exports.addCommand = (value) => {
  return {
    concept: 'Command',
    settings: {
      name: value.command,
      arguments: value.arguments.map((x) => {
        if (!isNaN(x)) {
          let theNumber = JSON.parse(JSON.stringify(record.attributes.Number))
          theNumber.settings.value = x
          return theNumber
        } else {
          return record.attributes[x]
        }
      }),
    },
  }
}
