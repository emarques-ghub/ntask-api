describe('Routes: Token', () => {
    const Users = app.models.users;
  
    describe('POST /token', () => {
      beforeEach(async () => {
        await Users.destroy({ where: {} });
        await Users.create({
          name: 'John',
          email: 'john@mail.net',
          password: '12345'
        });
      });
  
      describe('status 200', () => {
        it('returns authenticated user token', done => {
          request.post('/token')
            .send({
              email: 'john@mail.net',
              password: '12345'
            })
            .expect(200)
            .end((err, res) => {
              expect(res.body).to.include.keys('token');
              done(err);
            });
        });
      });
  
      describe('status 401', () => {
        it('throws error when password is incorrect', done => {
          request.post('/token')
            .send({
              email: 'john@mail.net',
              password: 'SENHA_ERRADA'
            })
            .expect(401)
            .end(done);
        });
        
        it('throws error when email not exists', done => {
          request.post('/token')
            .send({
              email: 'EMAIL_ERRADO',
              password: 'SENHA_ERRADA'
            })
            .expect(401)
            .end(done);
        });
  
        it('throws error when fields are blank', done => {
          request.post('/token')
            .expect(401)
            .end(done);
        });
      });
    });
  });



// const { expect } = require("chai");

// describe("Routes: Token", ()=> {
//     const Users = app.db.models.Users;
//     describe("POST /token", () => {
//         // beforeEach(done => {
//         //     //rotina pré-teste que limpa a tabela Users e cadastra um usuário para teste
//         //     Users
//         //         .destroy({where: {}})
//         //         .then(() => Users.create({
//         //             name: "John", 
//         //             email: "john@mail.net",
//         //             password: "12345"
//         //         }))
//         //         .then((done));
//         // });
//         describe("status 200", ()=> {
//             it("returns authenticated user token", done => {
//                 //envia dados de John para recebe token
//                 Users
//                     .destroy({where: {}})
//                     .then(() => Users.create({
//                         name: "John", 
//                         email: "john@mail.net",
//                         password: "12345"
//                     }))
//                     .then((done));
//                 request.post('/token')
//                 .send({
//                     email: 'john@email.net',
//                     password: '12345'
//                 })
//                 .expect(200)
//                 .end((err, res) => {
//                     expect(res.body).to.include.keys("token");
//                     done(err);
//                 });
//             });
//         });
//         describe("status 401", ()=> {
//             it("thown error when password is incorrect", done => {
//                 //envia senha errada de John
//                 request.post('/token')
//                 .send({
//                     email: 'john@email.net',
//                     password: '00000'
//                 })
//                 .expect(401)
//                 .end((err, res) => {
//                     done(err);
//                 });
//             });
//             it("thown error when email not found", done => {
//                 //envia email inexistente
//                 request.post('/token')
//                 .send({
//                     email: 'xxxx@email.net',
//                     password: '00000'
//                 })
//                 .expect(401)
//                 .end((err, res) => {
//                     done(err);
//                 });

//             });
//             // it("thown error when email & password is blank", done => {
//             //     //envia senha errada de John
//             //     request.post('/token')
//             //     .expect(401)
//             //     .end((err, res) => {
//             //         done(err);
//             //     });
//             // });
//         });
//     });
// });
