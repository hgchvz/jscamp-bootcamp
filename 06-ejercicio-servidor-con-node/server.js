import { createServer } from 'node:http'
import { randomUUID } from 'node:crypto'

process.loadEnvFile()

const port = process.env.PORT || 3000

const users = [
  { 
    id: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    name: 'Miguel',
    age: 28 
  },

  { 
    id: 'f6e5d4c3-b2a1-4f5e-6d7c-8b9a0e1f2a3b',
    name: 'Mateo', 
    age: 34 
  },

  { 
    id: '9a8b7c6d-5e4f-4a3b-2c1d-0e9f8a7b6c5d',
    name: 'Pablo', 
    age: 22 
  },

  { 
    id: '3c4d5e6f-7a8b-4c9d-0e1f-2a3b4c5d6e7f',
    name: 'Lucía', 
    age: 31 
  },

  { 
    id: '7b8c9d0e-1f2a-4b3c-4d5e-6f7a8b9c0d1e',
    name: 'Ana',   
    age: 26 
  },

  { 
    id: '5d6e7f8a-9b0c-4d1e-2f3a-4b5c6d7e8f9a',
    name: 'Juan',  
    age: 29 
  },

  { 
    id: '2a3b4c5d-6e7f-4a8b-9c0d-1e2f3a4b5c6d',
    name: 'Sofía', 
    age: 25 
  },

  { 
    id: '8f9a0b1c-2d3e-4f5a-6b7c-8d9e0f1a2b3c',
    name: 'Carlos',
    age: 37 
  },

  { 
    id: '4c5d6e7f-8a9b-4c0d-1e2f-3a4b5c6d7e8f',
    name: 'Elena', 
    age: 23 
  },

  { 
    id: '0e1f2a3b-4c5d-4e6f-7a8b-9c0d1e2f3a4b',
    name: 'Diego', 
    age: 30 
  },

]


const json = (req) => new Promise((resolve) => {
  let body = ''
  req.on('data', (chunk) => { body += chunk })
  req.on('end', () => { resolve(JSON.parse(body)) })
})

const server = createServer(async (req, res) => {

  const { pathname, searchParams } = new URL(req.url, `http://localhost:${port}`)

  // ===========
  // EJERCICIO 3
  // ===========
  if (req.method === 'GET' && pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      status: 'ok',
      uptime: process.uptime()
    }))
    return
  }

  // ===============
  // EJERCICIO 1 y 5
  // ===============
  if (req.method === 'GET' && pathname === '/users') {

    const nameFilter   = searchParams.get('name')
    const minAgeFilter = searchParams.get('minAge')
    const maxAgeFilter = searchParams.get('maxAge')
    const limitFilter  = searchParams.get('limit')
    const offsetFilter = searchParams.get('offset')

    let filteredUsers = [...users]

    if (nameFilter) {
      filteredUsers = filteredUsers.filter(user =>
        user.name.toLowerCase().includes(nameFilter.toLowerCase())
      )
    }

    if (minAgeFilter) {
      filteredUsers = filteredUsers.filter(user =>
        user.age >= Number(minAgeFilter)
      )
    }

    if (maxAgeFilter) {
      filteredUsers = filteredUsers.filter(user =>
        user.age <= Number(maxAgeFilter)
      )
    }

    if (limitFilter && offsetFilter) {
      const limit  = Number(limitFilter)
      const offset = Number(offsetFilter)
      filteredUsers = filteredUsers.slice(offset, offset + limit)
    }

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(filteredUsers))
    return
  }

  // ===========
  // EJERCICIO 2
  // ===========
  if (req.method === 'POST' && pathname === '/users') {
    const { name, age } = await json(req)

    const newUser = {
      id:   randomUUID(),
      name,
      age
    }

    users.push(newUser)

    res.writeHead(201, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(newUser))
    return
  }

  // ===========
  // EJERCICIO 4
  // ===========
  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ error: 'Ruta no encontrada' }))
})

server.listen(port, () => {
  const address = server.address()
  console.log(`Servidor escuchando en http://localhost:${address.port}`)
})