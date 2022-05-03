module.exports = app => {
    const Tasks = app.db.models.Tasks;

    app.route("/tasks")
        .all(app.auth.authenticate())
        /**
         * @api {get} /tasks Lista tarefas
         * @apiGroup Tarefas
         * @apiHeader {String} Authorization Token de usuário
         * @apiHeaderExample {json} Header
         *    {"Authorization": "JWT xyz.abc.123.hgf"}
         * @apiSuccess {Object[]} tasks Lista de tarefas
         * @apiSuccess {Number} tasks.id Id de registro
         * @apiSuccess {String} tasks.title Título da tarefa
         * @apiSuccess {Boolean} tasks.done Tarefa foi concluída?
         * @apiSuccess {Date} tasks.updated_at Data de atualização
         * @apiSuccess {Date} tasks.created_at Data de cadastro
         * @apiSuccess {Number} tasks.userId Id do usuário
         * @apiSuccessExample {json} Sucesso
         *    HTTP/1.1 200 OK
         *    [{
         *      "id": 1,
         *      "title": "Estudar",
         *      "done": false
         *      "updated_at": "2015-09-24T15:46:51.778Z",
         *      "created_at": "2015-09-24T15:46:51.778Z",
         *      "userId": 1
         *    }]
         * @apiErrorExample {json} Erro de consulta
         *    HTTP/1.1 412 Precondition Failed
         */
        .get((req, res) => {
            // lista de tarefas
            Tasks.findAll({where: {user_id: req.user.id}})
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        })
        /**
         * @api {post} /tasks Cadastra uma tarefas
         * @apiGroup Tarefas
         * @apiHeader {String} Authorization Token de usuário
         * @apiHeaderExample {json} Header
         *    {"Authorization": "JWT xyz.abc.123.hgf"}
         * @apiParam {String} title Título da tarefa
         * @apiParamExample {json} Entrada
         *    {"title": "Estudar"}
         * @apiSuccess {Number} id Id de registro
         * @apiSuccess {String} title Título da tarefa
         * @apiSuccess {Boolean} done=false Tarefa foi concluída?
         * @apiSuccess {Date} updated_at Data de atualização
         * @apiSuccess {Date} created_at Data de cadastro
         * @apiSuccess {Number} userId Id do usuário
         * @apiSuccessExample {json} Sucesso
         *    HTTP/1.1 200 OK
         *    {
         *      "id": 1,
         *      "title": "Estudar",
         *      "done": false,
         *      "updated_at": "2015-09-24T15:46:51.778Z",
         *      "created_at": "2015-09-24T15:46:51.778Z",
         *      "userId": 1
         *    }
         * @apiErrorExample {json} Erro de consulta
         *    HTTP/1.1 412 Precondition Failed
         */
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
    /**
     * @api {get} /tasks/:id Exibe uma tarefa
     * @apiGroup Tarefas
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *    {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiParam {id} id Id da tarefa
     * @apiSuccess {Number} id Id de registro
     * @apiSuccess {String} title Título da tarefa
     * @apiSuccess {Boolean} done Tarefa foi concluída?
     * @apiSuccess {Date} updated_at Data de atualização
     * @apiSuccess {Date} created_at Data de cadastro
     * @apiSuccess {Number} userId Id do usuário
     * @apiSuccessExample {json} Sucesso
     *    HTTP/1.1 200 OK
     *    {
     *      "id": 1,
     *      "title": "Estudar",
     *      "done": false
     *      "updated_at": "2015-09-24T15:46:51.778Z",
     *      "created_at": "2015-09-24T15:46:51.778Z",
     *      "userId": 1
     *    }
     * @apiErrorExample {json} Tarefa não existe
     *    HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Erro de consulta
     *    HTTP/1.1 412 Precondition Failed
     */
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
        /**
         * @api {put} /tasks/:id Atualiza uma tarefa
         * @apiGroup Tarefas
         * @apiHeader {String} Authorization Token de usuário
         * @apiHeaderExample {json} Header
         *    {"Authorization": "JWT xyz.abc.123.hgf"}
         * @apiParam {id} id Id da tarefa
         * @apiParam {String} title Título da tarefa
         * @apiParam {Boolean} done Tarefa foi concluída?
         * @apiParamExample {json} Entrada
         *    {
         *      "title": "Trabalhar",
         *      "done": true
         *    }
         * @apiSuccessExample {json} Sucesso
         *    HTTP/1.1 204 No Content
         * @apiErrorExample {json} Erro de consulta
         *    HTTP/1.1 412 Precondition Failed
         */
        .put((req, res) => {
            // "/tasks/1" cadastra nova tarefa
            Tasks.update(req.body, {where: {id: req.params.id, user_id: req.user.id}})
            .then(result => res.sendStatus(204))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
        })
        /**
         * @api {delete} /tasks/:id Exclui uma tarefa
         * @apiGroup Tarefas
         * @apiHeader {String} Authorization Token de usuário
         * @apiHeaderExample {json} Header
         *    {"Authorization": "JWT xyz.abc.123.hgf"}
         * @apiParam {id} id Id da tarefa
         * @apiSuccessExample {json} Sucesso
         *    HTTP/1.1 204 No Content
         * @apiErrorExample {json} Erro de consulta
         *    HTTP/1.1 412 Precondition Failed
         */
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

