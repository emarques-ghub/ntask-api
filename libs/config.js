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
    jwt: {
        secret: 'Nta$K-AP1',
        options: { session: false }
      }
};