const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes)=> {
    const Users = sequelize.define("Users", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
    }, {
        hooks: {
          beforeCreate: user =>  {
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
          }
        }
        }
    )
    Users.associate = function(models) {
                Users.hasMany(models.Tasks);
    };
    Users.isPassword = function(encodePassword, password){
        return bcrypt.compareSync(password, encodePassword);
    }
    return Users;
}