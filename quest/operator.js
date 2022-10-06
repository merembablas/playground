const binary = {
  'greater than': (leftOperand, rightOperand) => {
    return leftOperand > rightOperand
  },
  'less than': (leftOperand, rightOperand) => {
    return leftOperand < rightOperand
  },
  'equal to': (leftOperand, rightOperand) => {
    return leftOperand == rightOperand
  },
}

module.exports.binary = binary
module.exports.binaryRegistries = Object.keys(binary)
