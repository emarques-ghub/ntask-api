const { DataTypes } = require('sequelize');

module.exports = (app) => {
  const Tasks = app.db.define('Tasks', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  return Tasks;
};

// module.exports = (sequelize, DataTypes)=> {
//     const Tasks = sequelize.define("Tasks", {
//         id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoincrement: true
//         },
//         title: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             validate: {
//                 notEmpty: true
//             }
//         },
//         done: {
//             type: DataTypes.BOOLEAN,
//             allowNull: false,
//             defaultValue: false            
//         }
//     })
//     Tasks.associate = function(models) {
//                 Tasks.belongsTo(models.Users);
//     };
//     return Tasks;
// }

// module.exports = app => {
//     return {
//         findAll: (params, callback) => {
//             return callback([
//                 {title: "fazer compras"},
//                 {title: "consertar o pc"},                
//             ]);
//         }
//     };
// }
