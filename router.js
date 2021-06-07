const resources = require("./resources")
const pets = require("./routes/pets")

module.exports = {
  path: (data, callback) => {
    callback(200, { message: "esta es /path" });
  },
  mascotas: pets(resources.pets),
  noFound: (data, callback) => {
    callback(404, { message: "no encontrado" });
  },
};
