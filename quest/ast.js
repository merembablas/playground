const nodes = {
  number: {
    concept: 'Number',
    settings: {
      type: 'BigInt',
      value: 0,
    },
  },

  attribute: {
    concept: 'Attribute',
    settings: {
      name: '',
      type: '',
      filters: {},
      initialValue: '',
    },
  },

  asset: {
    concept: 'Asset',
    settings: {
      name: '',
      type: '',
    },
  },
}

let operators = []
let commands = []
let recordRegistries = []
let assetRegistries = []
let records = []
let assets = []
let attributes = []
let attrFilters = {}

module.exports.setOperators = (data) => {
  operators = data
}

module.exports.setCommands = (data) => {
  commands = data
}

module.exports.setRecordRegistries = (data) => {
  recordRegistries = data
}

module.exports.setAssetRegistries = (data) => {
  assetRegistries = data
}

module.exports.setRecord = (record) => {
  if (records.includes(record.id)) {
    return
  }

  records.push(record.id)
  attributes = attributes.concat(Object.keys(record.attributes))

  for (const [key, value] of Object.entries(record.attributes)) {
    attrFilters[key] =
      value.filters !== undefined ? Object.keys(value.filters) : []
  }
}

module.exports.setAsset = (asset) => {
  if (assets.includes(asset.id)) {
    return
  }

  assets.push(asset.id)
}

module.exports.buildContext = (value) => {
  return {
    concept: 'Pipeline',
    settings: {
      name: value,
    },
  }
}

module.exports.buildPipeline = (line) => {
  line = line.trim()
  if (!line in recordRegistries) {
    console.error(`Pipeline ${line} not found`)
    process.exit()
  }

  return line.trim().split(/\s+/)
}

module.exports.definedOnly = (x) => x !== undefined

module.exports.buildOperator = (line) => {
  return operators
    .map((op) => {
      if (line.trim().includes(op)) {
        let words = line.split(op)
        return {
          operator: op,
          operandLeft: words[0].trim(),
          operandRight: words[1].trim(),
        }
      }
    })
    .filter((x) => x !== undefined)[0]
}

module.exports.buildOperand = (rule) => {
  return attributes
    .map((attr) => {
      let operandLeft
      let operandRight

      if (rule.operandLeft.includes(attr)) {
        let filters = {}

        rule.operandLeft
          .split(attr)[1]
          .trim()
          .split(/\s+/)
          .forEach((value, index, content) => {
            if (attrFilters[attr].includes(value)) {
              filters[value] = content[index + 1]
            }
          })

        operandLeft = { name: attr, filters: filters }
      } else if (!isNaN(rule.operandLeft)) {
        operandLeft = { name: 'number', value: rule.operandLeft }
      } else {
        return
      }

      if (rule.operandRight.includes(attr)) {
        let filters = {}

        rule.operandRight
          .split(attr)[1]
          .trim()
          .split(/\s+/)
          .forEach((value, index, content) => {
            if (attrFilters[attr].includes(value)) {
              filters[value] = content[index + 1]
            }
          })

        operandRight = { name: attr, filters: filters }
      } else if (!isNaN(rule.operandRight)) {
        operandRight = { name: 'number', value: rule.operandRight }
      } else {
        return
      }

      return {
        operator: rule.operator,
        operandLeft: operandLeft,
        operandRight,
      }
    })
    .filter((x) => x !== undefined)[0]
}

const toNode = (x) => {
  let node
  if (x.name === 'number') {
    node = JSON.parse(JSON.stringify(nodes['number']))
    node.settings.value = x.value
  } else if (assets.includes(x.name)) {
    node = JSON.parse(JSON.stringify(nodes['asset']))
    node.settings.name = x.name
  } else {
    node = JSON.parse(JSON.stringify(nodes['attribute']))
    node.settings.name = x.name
    node.settings.filters = x.filters
  }

  return node
}

module.exports.buildRule = (value) => {
  return {
    concept: 'Rule',
    settings: {
      name: value.operator,
      arguments: [toNode(value.operandLeft), toNode(value.operandRight)],
    },
  }
}

module.exports.buildAsset = (line) => {
  line = line.trim()

  let prepCmds = commands
    .map((cmd) => {
      if (line.includes(cmd)) {
        let args = []

        line
          .split(cmd)[1]
          .trim()
          .split(/\s+/)
          .forEach((value) => {
            if (!isNaN(value)) {
              args.push({ name: 'number', value })
            } else if (assets.includes(value)) {
              args.push({ name: value })
            } else {
              console.error(`Asset ${value} not registered`)
              process.exit()
            }
          })

        return { name: cmd, args }
      }
    })
    .filter((x) => x !== undefined)[0]

  return prepCmds
}

module.exports.buildCommand = (value) => {
  return {
    concept: 'Command',
    settings: {
      name: value.name,
      arguments: value.args.map((x) => {
        return toNode(x)
      }),
    },
  }
}
