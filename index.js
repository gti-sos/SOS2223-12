// && npm run test-pollutions && npm run test-library
import express from "express";
import cors from "cors";

import { loadBackend_aml } from "./backend/index-aml.js";
import { handler } from "./frontend/build/handler.js";

var app = express();
app.use(cors());

var port = process.env.PORT || 12345;

//var backend_jfr = require("./backend/index-jfr");
//var backend_vem = require("./backend/index-vem");


//const BASE_API_URL = "/api/v1";
//var bodyParser = require("body-parser");

app.use(express.json()); //bodyParser
// app.use("/", express.static("./public")); // quitar esta ruta cuando
// todos cambiemos el backend_xxx por loadBackend_xxx

loadBackend_aml(app);
//backend_jfr(app);
//backend_vem(app);

app.use(handler);

app.listen(port, ()=>{
    console.log(`Servidor funcionando en ${port}`);
});