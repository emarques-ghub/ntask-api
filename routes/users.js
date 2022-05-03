// module.exports = app => {
//     const Users = app.models.users;
  
//     app.route('/user')
//       .all(app.auth.authenticate())

//       .get(async (req, res) => {
//         try {
//           const { id } = req.user;
//           const attributes = ['id', 'name', 'email'];
//           const options = { attributes };
//           const result = await Users.findByPk(id, options);
//           if (result) {
//             res.json(result);
//           } else {
//             res.sendStatus(404);
//           }
//         } catch (err) {
//           res.status(412).json({ msg: err.message });
//         }
//       })

//       .delete(async (req, res) => {
//         try {
//           const { id } = req.user;
//           const where = { id };
//           await Users.destroy({ where });
//           res.sendStatus(204);
//         } catch (err) {
//           res.status(412).json({ msg: err.message });
//         }
//       });
  

//     app.post('/users', async (req, res) => {
//       try {
//         const result = await Users.create(req.body);
//         res.json(result);
//       } catch (err) {
//         res.status(412).json({ msg: err.message });
//       }
//     });
  
//   };


module.exports = app => {
    const Users = app.models.users;
    app.route("/user")
        .all(app.auth.authenticate())
        /**
         * @api {get} /user Exibe usuário autenticado
         * @apiGroup Usuário
         * @apiHeader {String} Authorization Token de usuário
         * @apiHeaderExample {json} Header
         *  {"Authorization": "JWT xyz.abc.123.hgf"}
         * @apiSuccess {Number} id Id de registro
         * @apiSuccess {String} name Nome
         * @apiSuccess {String} email Email
         * @apiSuccessExample {json} Sucesso
         *  HTTP/1.1 200 OK
         *  {
         *  "id": 1,
         *  "name": "John Connor",
         *  "email": "john@connor.net"
         *  }
         * @apiErrorExample {json} Erro de consulta
         *  HTTP/1.1 412 Precondition failed
         */
        .get(async (req, res) => {
            try {
                const result = await Users.findByPk(req.user.id, { attributes: ["id", "name", "email"] });
                if(result) {
                    res.json(result);
                } else {
                    res.sendStatus(404);                    
                }
            } catch(err) {
                res.status(412).json({msg: err.message});
            }
            
        })
        /**
         * @api {delete} /user Exclui usuário autenticado
         * @apiGroup Usuário
         * @apiHeader {String} Authorization Token de usuário
         * @apiHeaderExample {json} Header
         *  {"Authorization": "JWT xyz.abc.123.hgf"}
         * @apiSuccessExample {json} Sucesso
         *  HTTP/1.1 204 No content
         * @apiErrorExample {json} Erro de consulta
         *  HTTP/1.1 412 Precondition failed
         */
        .delete(async (req, res) => {
            try {
                await Users.destroy( {where: {id: req.user.id} } )
                res.sendStatus(204);                    
            } catch (err) {
                res.status(412).json({msg: err.message});
            };
        });
        /**
         * @api {post} /users Cadastra novo usuário
         * @apiGroup Usuário
         * @apiParam {String} name Nome
         * @apiParam {String} email Email
         * @apiParam {String} password Senha
         * @apiParamExample {json} Entrada
         *  {
         *  "name": "John Connor",
         *  "email": "john@connor.net",
         *  "password": "123456"
         *  }
         * @apiSuccess {Number} id Id de registro
         * @apiSuccess {String} name Nome
         * @apiSuccess {String} email Email
         * @apiSuccess {String} password Senha croptografada
         * @apiSuccess {Date} updated_at Data de Atualização
         * @apiSuccess {Date} created_at Data de Cadastro
         * @apiSuccessExample {json} Sucesso
         *  HTTP/1.1 200 OK
         *  {
         *  "id": 1,
         *  "name": "John Connor",
         *  "email": "john@connor.net",
         *  "password": "@2a$10J1$SKB1B1"
         *  "updated_at": "2022-10-21T15:46:51.778Z"
         *  "created_at": "2022-10-21T15:46:51.778Z"
         *  }
         * @apiErrorExample {json} Erro no cadastro
         *  HTTP/1.1 412 Precondition failed
         */
        app.post("/users", async (req, res) => {
            try {
                const result = await Users.create(req.body);
                if(result) {
                    res.json(result);
                } else {
                    res.sendStatus(404);
                }                    
            } catch(err) {
                res.status(412).json({msg: err.message});
            };
    });

};