const dbConfig = require("../config/" + process.env.NODE_ENV + "/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.poi = require("./poi.model.js")(mongoose);

module.exports = db;
