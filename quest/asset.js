const AssetPoint = {
  id: 'assets.Point',
  concept: 'Asset',
  settings: {
    type: 'ERC20',
  },
}

const AssetEXP = {
  id: 'assets.EXP',
  concept: 'Asset',
  settings: {
    type: 'offchain',
  },
}

let assets = {}
assets[AssetPoint.id] = AssetPoint
assets[AssetEXP.id] = AssetEXP

module.exports.assets = assets
module.exports.registries = Object.keys(assets)
