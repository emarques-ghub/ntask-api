module.exports = app => {
    const Users = app.db.models.Users;

    Users
        .destroy({where: {}})
        .then(() => Users.create({
            name: "Admin", 
            email: "admin@email.com",
            password: "senha"
        }))
};