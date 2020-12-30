const { Pool } = require('pg')

const config = {
    user: 'cristobaldominguez',
    password: 'golden',
    host: 'localhost',
    database: 'likeme',
    port: 5432
}

const pool = new Pool(config)

async function newPost(postObject) {
    const query = {
        text: 'INSERT INTO posts(usuario, url, descripcion, likes) VALUES ($1, $2, $3, 0) RETURNING *',
        values: [ postObject.usuario, postObject.URL, postObject.descripcion ]
    }

    try {
        const result = await pool.query(query)
        return result.rows
    } catch (error) {
        console.error(error)
    }
}

async function updatePost(id) {
    const query = {
        text: 'UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *',
        values: [id]
    }

    try {
        const result = await pool.query(query)
        return result.rows
    } catch (error) {
        console.error(error)
    }
}

async function indexPosts() {
    const query = {
        text: 'SELECT * FROM posts'
    }

    try {
        const result = await pool.query(query)
        return result.rows
    } catch (error) {
        console.error(error)
    }
}

module.exports = { newPost, updatePost, indexPosts }