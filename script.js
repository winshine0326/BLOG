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

    res.status(201).json({ message: 'Post Success' })
})

app.delete('/delete/:id', (req,res) => {
    const { id } = req.params
    const postId = parseInt(id, 10)
    const index = postData.findIndex(post => post.id === postId)

    if (index == -1)
        return res.status(404).json({error:'not found'})

    postData.splice(index,1)
    res.status(200).json({ message: 'Delete Success' })
})

app.put('/put/:id', (req,res) => {
    const { id } = req.params
    const postId = parseInt(id, 10)
    const { title,content }= req.body
    // console.log(id)
    const index = postData.findIndex(post => post.id === postId)
    // console.log(index)
    if (index == -1)
        return res.status(404).json({error:'not found'})

    postData[index] = {id: postId, title: title, content: content}
    res.status(200).json({ message: 'Put Success' })
})

app.listen(3000, () => {
    console.log('Server is running')
})
