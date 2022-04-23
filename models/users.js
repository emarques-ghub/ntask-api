module.exports = (sequelize, DataType)=> {
    const Users = sequelize.define("Users", {
        id: {
            type: DataType.INTEGER,
            primarykey: true,
            autoincrement: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataType.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        classMethods: {
            associate: (models) => {
                Users.hasMany(models.Tasks);
            }
        }
    });
    return Users;
}