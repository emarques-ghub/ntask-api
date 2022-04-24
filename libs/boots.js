module.exports = app => {
    if(process.env.NODE_ENV !== "test") {
        app.db.sequelize.sync()
        .then(() => {
            console.log('Database connected...');
            app.listen(app.get("port"), () => {
                console.log(`NTask API - listening on port ${app.get("port")}`);
            });
        })
        .catch(function(err) {
            console.log(err)
        });
    }
}
