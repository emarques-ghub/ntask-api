const bcrypt = require('bcrypt');
const { DataTypes } = require('sequelize');

module.exports = (app) => {
  const Users = app.db.define('Users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
      set(value) {
        const salt = bcrypt.genSaltSync();
        const password = bcrypt.hashSync(value, salt);
        this.setDataValue('password', password);
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  return Users;
};

// const bcrypt = require('bcrypt');

// module.exports = (sequelize, DataTypes)=> {
//     const Users = sequelize.define("Users", {
//         id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoincrement: true
//         },
//         name: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             validate: {
//                 notEmpty: true
//             }
//         },
//         email: {
//             type: DataTypes.STRING,
//             unique: true,
//             allowNull: false,
//             validate: {
//                 notEmpty: true
//             }
//         },
//     });
//     Users.beforeCreate = function(user) {
//             const salt = bcrypt.genSaltSync();
//             user.password = bcrypt.hashSync(user.password, salt);
//     };
//     Users.associate = function(models) {
//                 Users.hasMany(models.Tasks);
//     };
//     Users.isPassword = function(encodePassword, password){
//         return bcrypt.compareSync(password, encodePassword);
//     }
//     return Users;
// }