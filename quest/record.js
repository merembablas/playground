const Play3Record = {
  id: 'publishers.Play3',
  concept: 'Record',
  attributes: {
    'video watched': {
      filters: {
        category: 'string',
        id: 'number',
      },
      type: 'number',
    },
    'quiz cleared': {
      filters: {
        category: 'string',
        type: 'string',
        id: 'number',
      },
      type: 'number',
    },
    'course finished': {
      filters: {
        category: 'string',
        id: 'number',
      },
      type: 'number',
    },
  },
}

const ThetanRecord = {
  id: 'games.Thetan',
  concept: 'Record',
  attributes: {
    'hero owned': {
      filters: {
        category: 'string',
        id: 'number',
      },
      type: 'number',
    },
    'hero rented': {
      filters: {
        category: 'string',
        id: 'number',
      },
      type: 'number',
    },
    'kill counted': {
      filters: {
        level: 'string',
        id: 'number',
      },
      type: 'number',
    },
    'quiz cleared': {
      filters: {
        category: 'string',
        id: 'number',
      },
      type: 'number',
    },
    'gTHC earned': {
      filters: {
        category: 'string',
        id: 'number',
      },
      type: 'number',
    },
  },
}

let records = {}
records[Play3Record.id] = Play3Record
records[ThetanRecord.id] = ThetanRecord

module.exports.records = records
module.exports.registries = Object.keys(records)
