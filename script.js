// 주석으로 한줄 한줄 달아보기

const express = require('express') // node.js에서 웹 서버를 쉽게 구축하기 위한 프레임 워크
const cors = require('cors')

const app = express() //app이라는 이름의 express
app.use(cors()) // 다른 도메인의 리소스를 요청할 수 있도록 허용(url이 바뀔 때 요청이 차단되지 않도록 함.)

app.use(express.json()) //body-parser 대신 사용

let postData = []

app.get('/get', (req, res) => { //get이라는 url로 들어가는 요청에 대해 어떤 작업을 수행할지 관리(라우팅 관리)
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

    const index = postData.findIndex(post => post.id === postId)

    if (index == -1)
        return res.status(404).json({error:'not found'})

    postData[index] = {id: postId, title: title, content: content}
    res.status(200).json({ message: 'Put Success' })
})

app.patch('/patch/:id',(req,res) =>{
    const { id } = req.params;
    const postId = parseInt(id, 10)
    const { title,content } = req.body

    const index = postData.findIndex(post => post.id === postId)
    
    if (index == -1)
        return res.status(404).json({error:'not found'})

    const post = postData[index]

    if(title !== undefined) post.title = title
    if(content !== undefined) post.content = content

    res.status(200).json({ message: 'Patch Success' })
})

app.listen(3000, () => {
    console.log('Server is running')
})
