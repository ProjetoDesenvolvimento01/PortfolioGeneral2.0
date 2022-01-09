const express = require("express");
const app = express();

app.set('view engine', 'ejs');
//Faz com que salve o arquivo em "uploads/" com o nome original do arquivo, data e extensão do arquivo

app.get("/", function(req, res){
    res.render("../views/index");
});

app.listen(8080, () => {
    console.log("====> Servidor ligado!! <====")
});