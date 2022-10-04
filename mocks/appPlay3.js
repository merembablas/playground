const express = require('express')
const app = express()
const port = 8002

app.get('/videos/:id', (req, res) => {
  let result = {}
  switch (req.params.id) {
    case '1':
      result = {
        title: 'Course 01',
        watchers: [
          { userId: 5, username: 'Jon', address: '0xAAA' },
          { userId: 6, username: 'jane', address: '0xBBB' },
        ],
        duration: 1000,
      }
      break
    case '2':
      result = {
        title: 'Course 02',
        watchers: [{ userId: 6, username: 'jane', address: '0xBBB' }],
        duration: 1000,
      }
      break
    default:
  }
  res.json(result)
})

app.get('/quiz/:id', (req, res) => {
  let result = {}
  switch (req.params.id) {
    case '1':
      result = {
        title: 'Quiz Course 01',
        finisher: [
          { userId: 5, username: 'Jon', address: '0xAAA' },
          { userId: 6, username: 'jane', address: '0xBBB' },
        ],
      }
      break
    case '2':
      result = {
        title: 'Quiz Course 02',
        finisher: [{ userId: 6, username: 'jane', address: '0xBBB' }],
      }
      break
    default:
  }
  res.json(result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
