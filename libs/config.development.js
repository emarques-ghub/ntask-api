module.exports = {
    database: "ntask",
    username: "",
    password: "",
    params: {
        dialect: "sqlite",
        storage: "ntask.sqlite",
        logging: true,
        define: {
            underscore: "true"
        }
    },
    jwt: {
        secret: 'Nta$K-AP1',
        options: { session: false }
      }
};