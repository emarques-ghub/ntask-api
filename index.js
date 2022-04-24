const express = require('express');
const consign = require('consign');
const PORT = 3000;

const app = express();

app.set("json spaces", 4);

consign()
    .include("libs/config.js")
    .then("db.js")
    .then("auth.js")
    .then("libs/middlewares.js")
    .then("routes")
    .then("libs/boots.js")
    .then("libs/init.js")
    .into(app);

//app.listen(PORT, () => console.log(`NTask API - porta ${PORT}`));
