const http = require('http');
const requestHandler = require("./request_handler")

global.resources = {
  mascotas: [
    {type: 'perro', name: 'coraje', owner: 'oscar'},
    {type: 'perro', name: 'coraje', owner: 'oscar'},
    {type: 'perro', name: 'coraje', owner: 'oscar'},
    {type: 'perro', name: 'coraje', owner: 'oscar'},
    {type: 'perro', name: 'coraje', owner: 'manhuel'}
  ]
}

const server = http.createServer(requestHandler)

server.listen(5000, ()=>{
  console.log('el servidor ha sido montado')
});