const express = require('express')
const app = express()
const port = 8002

app.get('/health', (req, res) => {
  res.json({
    status: 'success',
  })
})

app.get('/course', (req, res) => {
  let result = {}
  switch (req.query.category) {
    case 'thetan':
      result = [
        {
          title: 'Course 01',
          watchers: [
            { userId: 5, username: 'Jon', address: '0xAAA' },
            { userId: 6, username: 'jane', address: '0xBBB' },
          ],
          duration: 1000,
        },
        {
          title: 'Course 02',
          watchers: [{ userId: 6, username: 'jane', address: '0xBBB' }],
          duration: 1000,
        },
        {
          title: 'Course 03',
          watchers: [
            { userId: 5, username: 'Jon', address: '0xAAA' },
            { userId: 6, username: 'jane', address: '0xBBB' },
          ],
          duration: 1000,
        },
      ]
      break
    case 'blockchain':
      result = [
        {
          title: 'Course 04',
          watchers: [{ userId: 6, username: 'jane', address: '0xBBB' }],
          duration: 1000,
        },
      ]
      break
    default:
  }
  res.json(result)
})

app.get('/quiz', (req, res) => {
  let result = {}
  switch (req.query.category) {
    case 'thetan':
      result = [
        {
          title: 'Quiz Course 01',
          finisher: [
            { userId: 5, username: 'Jon', address: '0xAAA' },
            { userId: 6, username: 'jane', address: '0xBBB' },
          ],
        },
        {
          title: 'Quiz Course 02',
          finisher: [
            { userId: 5, username: 'Jon', address: '0xAAA' },
            { userId: 6, username: 'jane', address: '0xBBB' },
            { userId: 7, username: 'jane', address: '0xCCC' },
          ],
        },
      ]
      break
    case 'blockchain':
      result = [
        {
          title: 'Quiz Course 02',
          finisher: [{ userId: 6, username: 'jane', address: '0xBBB' }],
        },
      ]
      break
    default:
  }
  res.json(result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
