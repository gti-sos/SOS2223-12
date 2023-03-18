var express = require("express");

var app = express();
var port = process.env.PORT || 12345;

app.listen(port);
console.log("Servidor funcionando");

var backend_aml = require("./backend/index-aml");
var backend_jfr = require("./backend/index-jfr");
var backend_vem = require("./backend/index-vem");

const BASE_API_URL = "/api/v1";
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use("/", express.static("./public"));

backend_aml(app);
backend_jfr(app);
backend_vem(app);