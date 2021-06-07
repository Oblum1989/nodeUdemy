module.exports = function consultsHandler(consults) {
  return{
    get: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        if (consults[data.indice]) {
          return callback(200, consults[data.indice]);
        }
        return callback(404, {
          message: `elemento con indice ${data.indice} no encontrado`,
        });
      }
      callback(200, consults);
    },
    post: (data, callback) => {
      consults.push(data.payload);
      callback(201, data.payload);
    },
    put: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        if (consults[data.indice]) {
          consults[data.indice] = data.payload;
          return callback(200, consults[data.indice]);
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
        if (consults[data.indice]) {
          consults = consults.filter(
            (_consult, indice) => indice != data.indice
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