const express = require('express')
const app = express()
const port = 8001

app.get('/profile', (req, res) => {
  res.json({
    user_id: 5,
    username: 'markonah',
    hero_count: 1,
  })
})

app.get('/user/:id/hero', (req, res) => {
  res.json({
    hero_id: 5,
    name: 'Jack',
    skin_name: 'Jack the Ripper',
    level: 5,
    role: 'tank',
    avatar: 'http://example.com/image.jpg',
  })
})

app.get('/leaderboard', (req, res) => {
  res.send({
    ranking: [
      { userId: 5, username: 'Jon', address: '0xAAA' },
      { userId: 6, username: 'jane', address: '0xBBB' },
    ],
    tropies: [
      { userId: 5, username: 'Jon', address: '0xAAA' },
      { userId: 6, username: 'jane', address: '0xBBB' },
    ],
    victory: [
      { userId: 5, username: 'Jon', address: '0xAAA' },
      { userId: 6, username: 'jane', address: '0xBBB' },
    ],
    streak: [
      { userId: 5, username: 'Jon', address: '0xAAA' },
      { userId: 6, username: 'jane', address: '0xBBB' },
    ],
    hero: [
      { userId: 5, username: 'Jon', address: '0xAAA' },
      { userId: 6, username: 'jane', address: '0xBBB' },
    ],
    mvp: [
      { userId: 5, username: 'Jon', address: '0xAAA' },
      { userId: 6, username: 'jane', address: '0xBBB' },
    ],
    tripleKill: [
      { userId: 5, username: 'Jon', address: '0xAAA' },
      { userId: 6, username: 'jane', address: '0xBBB' },
    ],
    megaKill: [
      { userId: 5, username: 'Jon', address: '0xAAA' },
      { userId: 6, username: 'jane', address: '0xBBB' },
    ],
    winRateAverageTotal: [
      { userId: 5, username: 'Jon', address: '0xAAA' },
      { userId: 6, username: 'jane', address: '0xBBB' },
    ],
  })
})

app.get('/token', (req, res) => {
  res.json({
    gTHCTotal: 1000,
    gTHCNeededForWithdrawal: 10,
    gTHCNextClaimTime: 15,
    gTHGTotal: 111,
    gTHGNeededForWithdrawal: 200,
    gTHGNextClaimTime: 1212,
    powerPointTotal: 100,
  })
})

app.get('/hero_info', (req, res) => {
  res.json({
    heroId: 1,
    name: 'Jack',
    heroRarity: 'epic',
    skinRarity: 'epic',
    heroTrophyClass: '',
    level: 6,
    gTHCBattles: 1000,
    winBonus: 10,
    winRate: 10,
    dailyGTHCBattles: 1000,
    imageFull: 'http://example.com/images.jpg',
  })
})

app.get('/hero_rental', (req, res) => {
  res.send({
    ownerAddress: '0xCCCC',
    rentTime: 100000,
    maxRentalPeriod: 5,
    earnedgTHC: 100,
    thcRentalPrice: 1000,
    thcFee: 6,
    heroInfo: 1000,
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
