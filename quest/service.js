const axios = require('axios')
const url = require('url')

const play3BaseURL = 'http://localhost:8002'
const MLBaseURL = 'http://localhost:8001'
const thetanBaseURL = 'http://localhost:8000'

const Play3Service = {
  id: 'publishers.Play3',
  health: async () => {
    let result = await axios
      .get(`${play3BaseURL}/health`)
      .catch(function (error) {})

    return result !== undefined ? result : { status: 500 }
  },
  'video watched': async (filters, requestData) => {
    // DO SOMETHING
    return 2
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
  health: async () => {
    let result = await axios
      .get(`${thetanBaseURL}/health`)
      .catch(function (error) {})

    return result !== undefined ? result : { status: 500 }
  },
  'hero owned': (filters) => {
    // DO SOMETHING
    return 1
  },
  'hero rented': (filters) => {
    // DO SOMETHING
    return 2
  },
  'kill counted': (filters) => {
    // DO SOMETHING
    return 50
  },
  'gTHC earned': (filters) => {
    // DO SOMETHING
    return 100
  },
}

const MobileLegendService = {
  id: 'games.MobileLegend',
  health: async () => {
    let result = await axios
      .get(`${thetanBaseURL}/health`)
      .catch(function (error) {})

    return result !== undefined ? result : { status: 500 }
  },
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
