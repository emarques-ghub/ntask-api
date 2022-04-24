module.exports = app => {
    const Tasks = app.db.models.Tasks;

    app.route("/tasks")
        .all(app.auth.authenticate())
        .get((req, res) => {
            // lista de tarefas
            Tasks.findAll({where: {user_id: req.user.id}})
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        })
        .post((req, res) => {
            //authentica
            req.body.user_id = req.user.id;
            //cadastra nova tarefa
            Tasks.create(req.body)
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
        });

    app.route("/tasks/:id")
    .all(app.auth.authenticate())
    .get((req, res) => {
            // "/tasks/1" lista tarefa
            Tasks.findOne({where: {id: req.params.id, user_id: req.user.id}})
                .then(result => {
                    if(result) {
                        res.json(result);
                    }
                    else {
                        res.sendStatus(404);
                    }
                })
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        })
        .put((req, res) => {
            // "/tasks/1" cadastra nova tarefa
            Tasks.update(req.body, {where: {id: req.params.id, user_id: req.user.id}})
            .then(result => res.sendStatus(204))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
        })
        .delete((req, res) => {
            // "/tasks/1" exclui tarefa
            Tasks.destroy({where: {id: req.params.id, user_id: req.user.id}})
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        });

    };

    // app.get("/tasks", (req, res) => {
    //     Tasks.findAll({}).then(tasks => {
    //         res.json({tasks: tasks});
    //     });
    // });

