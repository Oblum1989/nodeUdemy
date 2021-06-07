module.exports = function veterinariansHandler(veterinarians) {
  return{
    get: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        if (veterinarians[data.indice]) {
          return callback(200, veterinarians[data.indice]);
        }
        return callback(404, {
          message: `elemento con indice ${data.indice} no encontrado`,
        });
      }
      callback(200, veterinarians);
    },
    post: (data, callback) => {
      veterinarians.push(data.payload);
      callback(201, data.payload);
    },
    put: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        if (veterinarians[data.indice]) {
          veterinarians[data.indice] = data.payload;
          return callback(200, veterinarians[data.indice]);
        }
        return callback(404, {
          message: `elemento con indice ${data.indice} no encontrado`,
        });
      }
      callback(400, { message: `indice no enviado` });
    },
    delete: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        console.log("entre", data.indice)
        if (veterinarians[data.indice]) {
          veterinarians = veterinarians.filter(
            (_veterinarian, indice) => indice != data.indice
          );
        }
        return callback(204, {
          message: `elemento con indice ${data.indice} eliminado`,
        });
      }
      callback(400, { message: `indice no enviado` });
    },
  }
}