const express = require("express");
const app = express();
const PORT = 8080;

app.set('view engine', 'ejs');
//Faz com que salve o arquivo em "uploads/" com o nome original do arquivo, data e extensão do arquivo

app.get("/", function(req, res){
    res.render("../views/index");
});

app.listen(PORT, () => {
    console.log("\n>> Observação: Não utilize Live Server para verificar as atualizações do site estão sendo atualizadas.");
    console.log(`>> Ao ligar o servidor no navegador, utilize: localhost:${PORT}`);
    console.log(`\n====> Servidor ligado!! PORTA: ${PORT} <====\n`);
});