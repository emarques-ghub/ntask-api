const Sequelize = require('sequelize');
const config = require('./config');

let sequelize = null;
const {
  db: { database, username, password, params }
} = config;

module.exports = () => {
  if (!sequelize) {
    sequelize = new Sequelize(
      database,
      username,
      password,
      params
    );
  }
  return sequelize;
};


// const fs = require('fs');
// const path = require("path");
// const Sequelize = require('sequelize');
// const config = require('./config');

// let db = null;
// let sequelize = null;

// module.exports = app => {
//     if(!db) {
//         //const config = app.db.config;
//         const sequelize = new Sequelize(
//             config.database,
//             config.username,
//             config.password,
//             config.params
//         );
//         db = {
//             sequelize,
//             Sequelize,
//             models: {}
//         };
//         const dir = path.join(__dirname, "models");
//         fs.readdirSync(dir).forEach(file => {
//             const modelDir = path.join(dir, file);
//             const model = require(modelDir)(sequelize, Sequelize.DataTypes);
//             db.models[model.name] = model;
//         });

//         Object.keys(db.models).forEach(key=> {
//             db.models[key].associate(db.models);
//         });
//     }
//     return db;
// };