const axios = require('axios')
const url = require('url')

const play3BaseURL = 'http://localhost:8002'

const Play3Service = {
  id: 'publishers.Play3',
  health: async () => {
    let result = await axios
      .get(`${play3BaseURL}/health`)
      .catch(function (error) {})

    return result !== undefined ? result : { status: 500 }
  },
  'video watched': async (filters, requestData) => {
    let result = await axios
      .get(`${play3BaseURL}/health`)
      .catch(function (error) {})

    return result !== undefined ? result : { status: 500 }
  },
  'quiz cleared': async (filters, requestData) => {
    const query = new url.URLSearchParams(filters)

    let result = await axios
      .get(`${play3BaseURL}/quiz`, { params: query })
      .catch(function (error) {
        console.log(error)
      })

    let sum = 0
    result.data.forEach((x) => {
      x.finisher.forEach((y) => {
        if (y.address === requestData.address) {
          sum += 1
        }
      })
    })

    return sum
  },
  'course finished': async (filters, requestData) => {
    const query = new url.URLSearchParams(filters)

    let result = await axios
      .get(`${play3BaseURL}/course`, { params: query })
      .catch(function (error) {
        console.log(error)
      })

    let sum = 0
    result.data.forEach((x) => {
      x.watchers.forEach((y) => {
        if (y.address === requestData.address) {
          sum += 1
        }
      })
    })

    return sum
  },
}

const ThetanService = {
  id: 'games.Thetan',
  health: () => {},
  'hero owned': (filters) => {},
  'hero rented': (filters) => {},
  'kill counted': (filters) => {},
  'gTHC earned': (filters) => {},
}

let services = {}
services[Play3Service.id] = Play3Service
services[ThetanService.id] = ThetanService

let attributes = {}
Object.keys(services).forEach((x) => {
  Object.keys(services[x]).forEach((y) => {
    attributes[y] = x
  })
})

module.exports.services = services
module.exports.registries = Object.keys(services)
module.exports.attributes = attributes
