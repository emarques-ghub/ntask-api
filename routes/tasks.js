module.exports = app => {
    const Tasks = app.db.models.Tasks;

    app.route("/tasks")
        // .all((req, res, next) => {
        //     //Middleware de pré-execução das rotas
        //     delete req.body.id;
        //     next();
        // })
        .get((req, res) => {
            // lista de tarefas
            Tasks.findAll({})
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        })
        .post((req, res) => {
            //cadastra nova tarefa
            Tasks.create(req.body)
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
        });

    app.route("/tasks/:id")
        // .all((req, res, next) => {
        //     //Middleware de pré-execução das rotas
        //     delete req.body.id;
        //     next();
        // })
        .get((req, res) => {
            // "/tasks/1" lista tarefa
            Tasks.findOne({where: req.params})
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
        })
        .delete((req, res) => {
            // "/tasks/1" exclui tarefa
        });

    };

    // app.get("/tasks", (req, res) => {
    //     Tasks.findAll({}).then(tasks => {
    //         res.json({tasks: tasks});
    //     });
    // });

