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
        }
    })
    Users.associate = function(models) {
                Users.hasMany(models.Tasks);
    };
    return Users;
}