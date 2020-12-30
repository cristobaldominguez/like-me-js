const http = require('http')
const fs = require('fs')
const url = require('url')
const { newPost, updatePost, indexPosts } = require('./db/index')

const server = http.createServer(async (req, res)=>{

    if(req.url === '/' && req.method === 'GET') {
        fs.readFile('./views/index.html',(error,file) =>{
            if(error) console.log(error)

            res.writeHead(200, {'Content-Type':'text/html'})
            res.end(file)
        })
    } else if (req.url === '/post' && req.method === 'POST') {
        let body
        req.on('data', datos => body = JSON.parse(datos))
        req.on('end', async () => {
            const datos = await newPost(body)

            res.writeHeader(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(datos))
        })

    } else if (req.url.startsWith('/post?id') && req.method === 'PUT') {
        const { id } = url.parse(req.url, true).query
        await updatePost(id)

        res.writeHeader(200, {'Content-Type': 'application/json'})
        res.end()

    } else if (req.url === '/posts' && req.method === 'GET') {
        const posts = await indexPosts()

        res.writeHeader(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(posts))
    }
})

server.listen(3000, _ => console.log('servidor 3000 funcionando'))
