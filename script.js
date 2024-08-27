const express = require('express')
const app = express()
var cors = require('cors')

app.use(cors())

app.get('/', function (req, res) {
    res.send('Hello World')
})
app.get('/sound/:name', function (req, res) {
    const { name } = req.params

    if(name == "dog")
        res.json({'sound' : '멍멍'})
    else if(name == "cat")
        res.json({'sound' : '야옹'})
})

app.listen(3000)