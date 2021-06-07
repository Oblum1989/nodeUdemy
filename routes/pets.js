module.exports = function petsHandler(pets) {
  return{
    get: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        if (pets[data.indice]) {
          return callback(200, pets[data.indice]);
        }
        return callback(404, {
          message: `mascota con indice ${data.indice} no encontrado`,
        });
      }
      callback(200, pets);
    },
    post: (data, callback) => {
      pets.push(data.payload);
      callback(201, data.payload);
    },
    put: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        if (pets[data.indice]) {
          pets[data.indice] = data.payload;
          return callback(200, pets[data.indice]);
        }
        return callback(404, {
          message: `mascota con indice ${data.indice} no encontrado`,
        });
      }
      callback(400, { message: `indice no enviado` });
    },
    delete: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        console.log("entre", data.indice)
        if (pets[data.indice]) {
          pets = pets.filter(
            (_mascota, indice) => indice != data.indice
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