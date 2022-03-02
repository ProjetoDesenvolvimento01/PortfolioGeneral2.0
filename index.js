const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const bodyparser = require("body-parser")
const flash = require('express-flash')
const session = require('express-session')
const adm = require('./Database/queryAdm')

const connection = require('./Database/connection')

const adminController = require('./controller/admController')

connection.authenticate().then(()=>{console.log('Conexão com o banco feita com sucesso!')}).catch((msgError) => {console.log(msgError)})

const { Pool } = require('pg');
const router = require("./controller/admController");

const pool = new Pool({ connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

pool.connect();

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));

app.use(session({
    secret: "salçjfçalsdfjsadlçjaf",
    resav: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000}
}))
app.use(flash())

app.use(bodyparser.urlencoded())
app.use(bodyparser.json())

app.use('/', adminController);

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/download/Alexandre', (req, res) => {
    try{
        const file = `${__dirname}/public/uploads/curriculo/ALEXANDRE_ESTEVAN_DE_CARVALHO_ARAUJO.pdf`
        res.download(file);
        console.log("Download feito com sucesso! 1")
    }catch(e){
        console.log(e)
    }
})

app.get('/download/LucasPereira', (req,res) => {
    try{
        const file = `${__dirname}/public/uploads/curriculo/Curriculo_Lucas_Pereira_Dos_Santos_Telefone_981675580.pdf`
        res.download(file)
        console.log("Download feito com sucesso! 2")
    }catch(e){
        console.log(e)
    }
})

app.get('/download/Pedro', (req,res) => {
    try{
        const file = `${__dirname}/public/uploads/curriculo/Curriculo_Pedro_Virgilio_Sousa_Silva.pdf`
        res.download(file)
        console.log("Download feito com sucesso! 3")
    }catch(e){
        console.log(e)
    }
})

app.get("/", function(req, res){

    adm.increment('view', {by: 1, where:{id: 1}})
    res.render("index");
});

app.listen(PORT, () => {
    console.log("\n>> Observação: Não utilize Live Server para verificar as atualizações do site estão sendo atualizadas.");
    console.log(`>> Ao ligar o servidor no navegador, utilize: localhost:${PORT}`);
    console.log(`\n====> Servidor ligado!! PORTA: ${PORT} <====\n`);
});