const fs = require('fs')

const ast = JSON.parse(fs.readFileSync(process.argv[2], 'utf-8'))

const convert = (x) => {
  if (x.concept === 'Number') {
    return x.settings.value
  } else {
    return x.settings.name
  }
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
