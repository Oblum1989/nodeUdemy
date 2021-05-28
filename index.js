const http = require('http');
const requestHandler = require("./request_handler");
const resources = require('./resources');

global.resources = resources

const server = http.createServer(requestHandler)

server.listen(5000, ()=>{
  console.log('el servidor ha sido montado')
});