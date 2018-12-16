const express = require('express')
const path = require('path')
const app = express()
const port = 3000

// Static files
app.use(express.static(path.join(__dirname, 'client')))
app.use(express.static(path.join(__dirname, 'static')))

app.post('/upload', (req, res) => res.send('<h1>hey</h1>'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))