const players = {
  concept: 'Attribute',
  settings: {
    name: 'Thetan.players',
    type: 'User[]',
    initialValue: [],
  },
}

const heroes = {
  concept: 'Attribute',
  settings: {
    name: 'Thetan.heroes',
    type: 'Hero[]',
    initialValue: [],
  },
}

const ranking = {
  concept: 'Attribute',
  settings: {
    name: 'Thetan.ranking',
    type: 'Number',
  },
}

const address = {
  concept: 'Attribute',
  settings: {
    name: 'Message.address',
    type: 'address',
    initialValue: '',
  },
}

const number = {
  concept: 'Number',
  settings: {
    type: 'BigInt',
    value: 0,
  },
}

const assetPoint = {
  concept: 'Asset',
  settings: {
    name: 'assets.Point',
  },
}

const assetEXP = {
  concept: 'Asset',
  settings: {
    name: 'assets.EXP',
  },
}

module.exports.attributes = {
  'Thetan.players': players,
  'Thetan.heroes': heroes,
  'Thetan.ranking': ranking,
  'Message.address': address,
  Number: number,
  'assets.Point': assetPoint,
  'assets.EXP': assetEXP,
}
