const fs = require('fs')

const ast = JSON.parse(fs.readFileSync(process.argv[2], 'utf-8'))

const convert = (x) => {
  let data = ''
  if (x.concept === 'Number') {
    data = x.settings.value
  } else {
    if (x.settings.filters === undefined) {
      data = x.settings.name
    } else {
      let filterText = Object.keys(x.settings.filters)
        .map((y) => `${y} ${x.settings.filters[y]}`)
        .join(' ')
      data = `${x.settings.name} ${filterText}`
    }
  }

  return data
}

let concreteSyntax = ''

concreteSyntax = ast.content
  .map((ast) => {
    let text = ''
    if (ast.concept === 'Context') {
      text += 'context\r\n'
      text += '  ' + ast.values.map((x) => x.settings.name).join('\r\n  ')
    } else if (ast.concept === 'Condition') {
      text += 'if\r\n'
      text +=
        '  ' +
        ast.values
          .map((x) => {
            return `${convert(x.settings.arguments[0])} ${
              x.settings.name
            } ${convert(x.settings.arguments[1])}`
          })
          .join('\r\n  ')
    } else if (ast.concept === 'Consequence') {
      text += 'then\r\n'
      text +=
        '  ' +
        ast.values
          .map((x) => {
            let commands = [x.settings.name]
            let commandArgs = x.settings.arguments.map((x) => {
              let theValue
              if (x.concept === 'Number') {
                theValue = x.settings.value
              } else {
                theValue = x.settings.name
              }

              return theValue
            })
            commands.push(commandArgs.join(' '))
            return commands.join(' ')
          })
          .join('\r\n  ')
    }
    return text
  })
  .join('\r\n\r\n')

console.log(concreteSyntax)
