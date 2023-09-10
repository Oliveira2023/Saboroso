var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
   
    res.render('admin/index', {
        title: 'Admin - Restaurante Saboroso!'
    });
})

router.get('/login', function(req, res, next){

    res.render('admin/login', {
        title: 'Login - Restaurante Saboroso!'
    })
    
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