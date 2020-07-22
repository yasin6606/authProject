const http = require('http');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');

module.exports = class Application {
    constructor() {
        setServer();
        setConfigs();
        setRoutes();
    };
};

// http server & Mongoose
setServer = () => {
    const server = http.createServer(app);

    server.listen(process.env.SERVER_PORT, async () => {
        const mongooseOpt = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            dbName: "auth-project",
        };

        const db = await mongoose.connect(process.env.MONGOOSE_URI, mongooseOpt);
        !db ? console.log('database has ERROR') : console.log('database successfully connected');
    }).on('error', error => console.log(`Server has error => ${error}`));
};

// configs
setConfigs = () => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
};

// routes
setRoutes = () => {
    app.use(routes);
};