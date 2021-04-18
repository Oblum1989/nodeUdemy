const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');

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

    const data = {
      path: pathClean,
      query,
      method,
      headers,
      payload: buffer
    }

    let handler
    if (pathClean && router[pathClean]) {
      handler = router[pathClean]
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
  ruta: (data, callback) => {
    callback(200, {message: 'esta es /ruta'})
  },
  usuarios: (data, callback) => {
    callback(200, [{nombre: 'oscar'}, {nombre: 'camila'}])
  },
  noFound: (data, callback) => {
    callback(404, {message: 'no encontrado'})
  }
}

server.listen(5000, ()=>{
  console.log('el servidor ha sido montado')
});