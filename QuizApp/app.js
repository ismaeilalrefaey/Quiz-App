// ------- 3rd Party Pkg Imports --------- //
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');
const express       = require('express');

// ------------ My Imports --------------- //
const Router    = require('./Router/Router');
const keys      = require('./dev/keys');

// --------------------------------------- //
const app = express();

mongoose.connect(keys.mongodbURI)
    .then(() => {
        // This make the body of req in json format, JS object
        app.use(bodyParser.json());

        // The router handle all type of routes
        app.use('/admin' ,Router.Admin);
        app.use('/applicant' ,Router.Applicant);

        // Let the app listen to a port
        app.listen(keys.PORT ,() => {
            console.log("-------------------");
            console.log("Connected To The DB");
            console.log("------------------------------");
            console.log(`Server Is Running On Port ${keys.PORT}`);
            console.log("------------------------------");
        });
    })
    .catch(err => {
        console.log(err);
    });