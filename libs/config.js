module.exports = {
    database: "ntask",
    username: "",
    password: "",
    params: {
        dialect: "sqlite",
        storage: "ntask.sqlite",
        define: {
            underscore: "true",
            logging: true,
        }
    },
    jwtSecret: "NTa$k-AP1",
    jwtSession: {session: false}
};