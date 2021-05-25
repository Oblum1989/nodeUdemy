const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');

let resources = {
  mascotas: [
    {type: 'perro', name: 'coraje', owner: 'oscar'},
    {type: 'perro', name: 'coraje', owner: 'oscar'},
    {type: 'perro', name: 'coraje', owner: 'oscar'},
    {type: 'perro', name: 'coraje', owner: 'oscar'},
    {type: 'perro', name: 'coraje', owner: 'manhuel'}
  ]
}

const server = http.createServer((req, res) => {
  const currentUrl = req.url
  const parseUrl = url.parse(currentUrl, true)

  const path = parseUrl.pathname

  const pathClean = path.replace(/^\/+|\/+$/g, '')

  const method = req.method.toLowerCase()

  const {query={}} = parseUrl

  const {headers={}} = req

  const decoder = new StringDecoder('utf8');
  let buffer = ''
  req.on('data', (data)=>{
    buffer += decoder.write(data)
  })
  req.on('end', ()=>{
    buffer += decoder.end()

    if (headers["content-type"] === "application/json") {
      buffer = JSON.parse(buffer)
    }

    if(pathClean.indexOf("/") > -1){
      var [principalPath, indice] = pathClean.split('/')
    }

    const data = {
      indice,
      path: principalPath || pathClean,
      query,
      method,
      headers,
      payload: buffer
    }

    console.log({data})

    let handler
    if (data.path && router[data.path] && router[data.path][method]) {
      handler = router[data.path][method]
    }else{
      handler = router.noFound
    }

    if (typeof handler === 'function') {
      handler(data, (statusCode = 200, message)=>{
        const response = JSON.stringify(message)
        res.setHeader("Content-Type", "application/json")
        res.writeHead(statusCode)
        res.end(response)
      })
    }
  })

});

const router = {
  path: (data, callback) => {
    callback(200, {message: 'esta es /path'})
  },
  mascotas: {
    get: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        if(resources.mascotas[data.indice]){
          return callback(200, resources.mascotas[data.indice])
        }
        return callback(404, {message: `mascota con indice ${data.indice} no encontrado`})
      }
      callback(200, resources.mascotas)
    },
    post: (data, callback) => {
      resources.mascotas.push(data.payload)
      callback(201, data.payload)
    }
  },
  noFound: (data, callback) => {
    callback(404, {message: 'no encontrado'})
  }
}

server.listen(5000, ()=>{
  console.log('el servidor ha sido montado')
});