module.exports = (sequelize, DataType)=> {
    const Tasks = sequelize.define("Tasks", {
        id: {
            type: DataType.INTEGER,
            primarykey: true,
            autoincrement: true
        },
        title: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        done: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false            
        }
    }, {
        classMethods: {
            associate: (models) => {
                Tasks.belongsTo(models.Users);
            }
        }
    });
    return Tasks;
}

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
