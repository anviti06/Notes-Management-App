jest.setTimeout(30000);
require('../models/User');
const mongoose = require('mongoose');
const keys = require('../config/keys');

mongoose.connect(keys.mongoURI, () => { }, { useNewUrlParser: true }).then(() => { console.log("mongo connected"); })
    .catch(err => {
        console.log("error in mongoose is here=", err);
    });