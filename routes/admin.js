var express = require('express');
const user = require('../inc/user');
var router = express.Router();

router.use(function(req, res, next){
// console.log("URL: ",req.url) 
    if (['/login'].indexOf(req.url) === -1 && !req.session.user){
        res.redirect('/admin/login')
        console.log('dentro do if', req.url)
    }else{
       next()
    }
})

router.get('/logout', function(req, res, next){

    delete req.session.user
    res.redirect('/admin/login')

})

router.get('/', function(req, res, next) {
   
    res.render('admin/index', {
        title: 'Admin - Restaurante Saboroso!'
    });
    
})

router.get('/login', function(req, res, next){

    res.render('admin/login', {
        title: 'Login - Restaurante Saboroso!',
        body: req.body
    })
})

router.post('/login', function(req, res, next){
    
    if (!req.body.email){
        user.render(req, res, "Digite o email")
    }else if(!req.body.password){
        user.render(req, res, "Digite a senha")
    }else{
        user.login(req.body.email, req.body.password).then(user=>{

            req.session.user = user
            
            res.redirect('/admin')

        }).catch(err=>{
            user.render(req, res, err.message || err)
        })
    }


    //user.render(req, res, null, 'Login efetuado com sucesso!')
})

router.get('/emails', function(req, res, next){

    res.render('admin/emails', {
        title: 'Email - Restaurante Saboroso!'
    })
    
})

router.get('/reservations', function(req, res, next){
    
    res.render('admin/reservations', {
        title: 'Reservations - Restaurante Saboroso!',
        date: {}
    })
})

router.get('/services', function(req, res, next){
    
    res.render('admin/services', {
        title: 'Services - Restaurante Saboroso!'
    })
})

router.get('/contacts', function(req, res, next){
    
    res.render('admin/contacts', {
        title: 'Contacts - Restaurante Saboroso!'
    })
})

router.get('/menus', function(req, res, next){
    
    res.render('admin/menus', {
        title: 'Menus - Restaurante Saboroso!'
    })
})

router.get('/users', function(req, res, next){
    
    res.render('admin/users', {
        title: 'Users - Restaurante Saboroso!'
    })
})

module.exports = router