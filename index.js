import express from "express";
import cors from "cors";
import request from "request";

import { loadBackend_aml } from "./backend/index-aml.js";
import { loadBackend_aml2 } from "./backend/v2/index-aml2.js";

import { loadBackend_jfr } from "./backend/index-jfr.js";
import { loadBackend_jfr2 } from "./backend/v2/index-jfr2.js";

import { loadBackend_vem } from "./backend/index-vem.js";
import { loadBackend_vem2 } from "./backend/v2/index-vem2.js";

import { handler } from "./frontend/build/handler.js";

var app = express();
app.use(cors());


var port = process.env.PORT || 12345;



//var backend_jfr = require("./backend/index-jfr");
//var backend_vem = require("./backend/index-vem");


//const BASE_API_URL = "/api/v1";
//var bodyParser = require("body-parser");

app.use(express.json()); //bodyParserç

//Proxy Álvaro:
var paths = "/evol";
var apiServerHost = "https://sos2223-13.ew.r.appspot.com/api/v2/evolution";

app.use(paths, function(req, res) {
    var url = apiServerHost + req.url;
    req.pipe(request(url)).pipe(res);
});

//Proxy Jorge:
var paths2 = "/employ";
var apiServerHost2 = "https://sos2223-13.appspot.com/api/v2/employment";

app.use(paths2, function(req, res) {
    var url = apiServerHost2 + req.url;
    req.pipe(request(url)).pipe(res);
});

//Proxy Victor:
var paths3 = "/evolut";
var apiServerHost3 = "https://sos2223-13.ew.r.appspot.com/api/v2/evolution";

app.use(paths3, function(req, res) {
    var url = apiServerHost3 + req.url;
    req.pipe(request(url)).pipe(res);
});

// app.use("/", express.static("./public")); // quitar esta ruta cuando
// todos cambiemos el backend_xxx por loadBackend_xxx

loadBackend_aml(app);
loadBackend_aml2(app);

loadBackend_jfr(app);
loadBackend_jfr2(app);

loadBackend_vem(app);
loadBackend_vem2(app);

//backend_vem(app);

app.use(handler);


app.listen(port, ()=>{
    console.log(`Servidor funcionando en ${port}`);
});