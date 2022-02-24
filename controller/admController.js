const express = require('express')
const router = express.Router()
const adm = require('../Database/queryAdm')
const bcrypt = require('bcrypt')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const auth = require('../middleware/auth')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/uploads/images")
    },
    filename: function(req, file, cb){
        cb(null, file.originalname + Date.now() + path.extname(file.originalname))
    }
})

const upimage = multer({ storage })

router.get('/userAuthentic', auth,(req, res) => {
    var user = req.session.resultado.id
    if(user != undefined){
        adm.findByPk(user).then(resultado => {
            res.render('../views/admin/userAuthentic', {nome: resultado.nome, foto: resultado.image})
        })
    }else{
        res.redirect('/login')
    }
})

router.get('/login/0/admin', (req, res) => {
    var erro = req.flash("erroLogin")
    erro = (erro == undefined || erro.length == 0) ? undefined : erro
    res.render('../views/admin/loginAdm', {erro: erro})
})

router.get('/cadastrar', (req, res) => {
    var erro = req.flash("erro")
    var nome = req.flash("nome")
    var email = req.flash("email")
    
    erro = (erro == undefined || erro.length == 0) ? undefined : erro
    nome = (nome == undefined || nome.length == 0) ? undefined : nome
    email = (email == undefined || email.length == 0) ? undefined : email

    res.render('../views/admin/cadastroAdm.ejs', {nome: nome, email: email, erro: erro})
})

router.post('/cadastrar', upimage.single('foto'), (req, res) => {
    var { nome, email, password } = req.body

    var foto = req.file
    if(foto != undefined){
        foto = foto.path.replace('public', 'uploads', '')
    }else{
        foto = '/uploads/images'
    }

    req.flash("nome", nome)
    req.flash("email", email)


    adm.findOne({where:{email: email}}).then(resultado => {
        if(resultado == undefined){
            var salt = bcrypt.genSaltSync(10)
            var hash = bcrypt.hashSync(password, salt)
            adm.create({
                nome: nome,
                email: email,
                senha: hash,
                foto: foto
            }).then(dado => {
                res.redirect('/login/0/admin')
            })
        }else{
            res.redirect('/login/0/admin')
        }
    }).catch(err => {
        var erro = `erro ao cadastrar usuário`
        req.flash("erro", erro)
        res.redirect('/cadastrar')
    })
})

router.post('/login/0/admin', (req, res) => {
    var {email, senha} = req.body

    if(email != '' && senha != ''){
        adm.findOne({where:{email: email}}).then(resultado => {
            console.log(resultado)
            if(resultado != undefined){
                // Verificação de usuário autenticado!
                var correct = bcrypt.compareSync(senha, resultado.senha)
                var user = resultado.nome
                if(correct){
                    req.session.resultado = {
                        id: resultado.id,
                        nome: user
                    }
                    res.redirect('/userAuthentic')
                }else{
                    var erro = `Credenciais Inválidas!`
                    req.flash('erroLogin', erro)
                    res.redirect('/login/0/admin')
                }
            }else{
                var erro = `Credenciais Inválidas!`
                    req.flash('erroLogin', erro)
                    res.redirect('/login/0/admin')
            }
        })
    }else{
        res.redirect('/login/0/admin')
    }
})

router.get('/logout', (req, res) => {
    req.session.resultado = undefined
    res.redirect('/')
})

module.exports = router;