const https = require('https');
const fs = require('fs');

// const certs = {
//   key: fs.readFileSync('ntask.key', 'utf8'),
//   cert: fs.readFileSync('ntask.cert', 'utf8')
// };

module.exports = app => {
  async function start(port) {
    try {
      //await app.db.authenticate();
      await app.db.sync();
      if (process.env.NODE_ENV !== 'test') {
        //const server = https.createServer(certs, app);
        console.log('Database connected...');

        // const Users = app.models.users;
        // Users.destroy({ where: {} });
        // Users.create({
        //   id: 1,   
        //   name: 'admin',
        //   email: 'admin@mail.net',
        //   password: '12345'
        //   });

        //server.listen(port, () => {
        app.listen(app.get("port"), () => {
          console.log(`NTask API - listening on port ${app.get("port")}`);
//          console.log(`NTask API - porta ${port}`);
        });
      }
    } catch (err) {
      console.log('Erro de conexão com banco de dados.');
      console.error(err);
    }
  }

  start(app.get('port'));
}