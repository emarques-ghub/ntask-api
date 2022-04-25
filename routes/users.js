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
        .delete(async (req, res) => {
            try {
                await Users.destroy( {where: {id: req.user.id} } )
                res.sendStatus(204);                    
            } catch (err) {
                res.status(412).json({msg: err.message});
            };
        });

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