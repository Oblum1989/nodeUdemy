module.exports = function ownersHandler(owners) {
  return{
    get: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        if (owners[data.indice]) {
          return callback(200, owners[data.indice]);
        }
        return callback(404, {
          message: `elemento con indice ${data.indice} no encontrado`,
        });
      }
      callback(200, owners);
    },
    post: (data, callback) => {
      owners.push(data.payload);
      callback(201, data.payload);
    },
    put: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        if (owners[data.indice]) {
          owners[data.indice] = data.payload;
          return callback(200, owners[data.indice]);
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
        if (owners[data.indice]) {
          owners = owners.filter(
            (_owner, indice) => indice != data.indice
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