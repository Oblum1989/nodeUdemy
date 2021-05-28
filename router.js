module.exports = {
  path: (data, callback) => {
    callback(200, {message: 'esta es /path'})
  },
  mascotas: {
    get: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        if(global.resources.mascotas[data.indice]){
          return callback(200, global.resources.mascotas[data.indice])
        }
        return callback(404, {message: `mascota con indice ${data.indice} no encontrado`})
      }
      callback(200, global.resources.mascotas)
    },
    post: (data, callback) => {
      global.resources.mascotas.push(data.payload)
      callback(201, data.payload)
    },
    put: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        if(global.resources.mascotas[data.indice]){
          global.resources.mascotas[data.indice] = data.payload
          return callback(200, global.resources.mascotas[data.indice])
        }
        return callback(404, {message: `mascota con indice ${data.indice} no encontrado`})
      }
      callback(400, {message: `indice no enviado`})
    },
  },
  noFound: (data, callback) => {
    callback(404, {message: 'no encontrado'})
  }
}