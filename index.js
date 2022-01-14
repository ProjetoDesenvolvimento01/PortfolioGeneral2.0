const express = require("express");
const app = express();
const PORT = 8080;


app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get("/", function(req, res){
    res.render("index", { text: 'TESTE DE EJS'});
});

app.listen(PORT, () => {
    console.log("\n>> Observação: Não utilize Live Server para verificar as atualizações do site estão sendo atualizadas.");
    console.log(`>> Ao ligar o servidor no navegador, utilize: localhost:${PORT}`);
    console.log(`\n====> Servidor ligado!! PORTA: ${PORT} <====\n`);
});