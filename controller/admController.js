const express = require('express')
const router = express.Router()
const adm = require('../Database/queryAdm')
const bcrypt = require('bcrypt')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/uploads/images")
    },
    filename: function(req, file, cb){
        cb(null, file.originalname + Date.now() + path.extname(file.originalname))
    }
})

const upimage = multer({ storage })

router.get('/userAuthentic', (req, res) => {
    var user = req.session.resultado.id
    if(user != undefined){
        adm.findByPk(user).then(resultado => {
            res.render('../views/admin/userAuthentic', {nome: resultado.nome, image: resultado.image})
        })
    }else{
        res.redirect('/login')
    }
})

router.get('/login/0/admin', (req, res) => {
    res.render('../views/admin/loginAdm')
})

router.get('/cadastrar', (req, res) => {
    res.render('../views/admin/cadastroAdm.ejs')
})

router.post('/cadastrar', (req, res) => {
    var { nome, email, password } = req.body

    adm.findOne({where:{email: email}}).then(resultado => {
        if(resultado == undefined){
            var salt = bcrypt.genSaltSync(10)
            var hash = bcrypt.hashSync(password, salt)
            adm.create({
                nome: nome,
                email: email,
                senha: hash,
            }).then(dado => {
                res.redirect('/login/0/admin')
            })
        }else{
            res.redirect('/login/0/admin')
        }
    })
})

router.post('/login/0/admin', (req, res) => {
    var {email, senha} = req.body

    if(email != '' && senha != ''){
        adm.findOne({where:{email: email}}).then(resultado => {
            console.log(resultado)
            if(resultado != undefined){
                // Verificação de usuário autenticado!
                var correct = bcrypt.compareSync(senha)
                var user = resultado.nome
                if(correct){
                    req.session.resultado = {
                        id: resultado.id,
                        nome: user
                    }
                    res.redirect('/userAuthentic')
                }else{
                    res.send("Credenciais invalidas")
                }
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