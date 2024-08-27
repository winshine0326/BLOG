const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

app.use(express.json())

let postData = []

app.get('/get', (req, res) => {
    res.json(postData)
})

app.post('/post', (req, res) => {
    const { title, content } = req.body

    postData.push({
        id: postData.length + 1,
        title: title,
        content: content
    })

    res.status(201).json({ message: 'Success' })
})

app.listen(3000, () => {
    console.log('Server is running')
})
