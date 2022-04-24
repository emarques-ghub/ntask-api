module.exports = {
    database: "ntask_test",
    username: "",
    password: "",
    params: {
        dialect: "sqlite",
        storage: "ntask.sqlite",
        logging: false,
        define: {
            underscore: "true",
        }
    },
    jwt: {
        secret: 'Nta$K-AP1',
        options: { session: false }
      }
};