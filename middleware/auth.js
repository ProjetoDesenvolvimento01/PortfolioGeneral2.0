function auth(req, res, next){
    if(req.session.resultado != undefined){
        console.log(req.session)
        next()
    }else{
        var erro = `É necessário realizar login`
        req.flash('erroLogin', erro)
        res.redirect('/login/0/admin')
    }
}

module.exports = auth