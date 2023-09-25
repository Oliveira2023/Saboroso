var express = require('express');
const user = require('../inc/user');
var router = express.Router();
var admin = require('../inc/admin');
var menus = require('../inc/menus');
var reservations = require('../inc/reservations');
var moment = require('moment');

moment.locale('pt-br')

router.use(function(req, res, next){

    if (['/login'].indexOf(req.url) === -1 && !req.session.user){
        res.redirect('/admin/login')
    }else{
       next()
    }
})

router.use(function(req, res, next){
    
    req.menus = admin.getMenus(req)
    next()

})

router.get('/logout', function(req, res, next){

    delete req.session.user
    res.redirect('/admin/login')

})

router.get('/', function(req, res, next) {
   
    admin.dashboard().then(data=>{
        
        res.render('admin/index', admin.getParams(req, {
            title: 'Admin - Restaurante Saboroso!',
            data
        }))
    }).catch(err=>{
        console.error(err)
    })
    
    
})

router.get('/login', function(req, res, next){

        res.render('admin/login', admin.getParams(req, {
            title: 'Admin - Restaurante Saboroso!',
            //data
        }))
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


    // user.render(req, res, null, 'Login efetuado com sucesso!')
})

router.get('/emails', function(req, res, next){

    res.render('admin/emails', admin.getParams(req, {
        title: 'Email - Restaurante Saboroso!'
    }))
})

router.get('/reservations', function(req, res, next){

    reservations.getReservations().then(data=>{
        
        res.render('admin/reservations', admin.getParams(req, {
            title: 'Reservations - Restaurante Saboroso!',
            date: {},
            data,
            moment
        }))
    })
    
})
router.post('/reservations', function(req, res, next){

    
    menus.save(req.fields, req.files).then(results=>{
        res.send(results)
    }).catch(err=>{
        res.send(err)
    })
})

router.delete('/reservations/:id', function(req, res, next){

    reservations.delete(req.params.id).then(results=>{

        res.send(results)

    }).catch(err=>{
        
        res.send(err)
    })
})

router.get('/services', function(req, res, next){
    
    res.render('admin/services', admin.getParams(req, {
        title: 'Services - Restaurante Saboroso!'
    }))
})

router.get('/contacts', function(req, res, next){
    
    res.render('admin/contacts', admin.getParams(req, {
        title: 'Contacts - Restaurante Saboroso!'
    }))
})

router.get('/menus', function(req, res, next){
    
    menus.getMenus().then(data=>{
        
        res.render('admin/menus', admin.getParams(req, {
            title: 'Menus - Restaurante Saboroso!',
            data
        }))
    })
})

router.post('/menus', function(req, res, next){

    
    menus.save(req.fields, req.files).then(results=>{
        res.send(results)
    }).catch(err=>{
        res.send(err)
    })
})

router.delete('/menus/:id', function(req, res, next){
    menus.delete(req.params.id).then(results=>{
        res.send(results)
    }).catch(err=>{
        
    })
})

router.get('/users', function(req, res, next){
    
    res.render('admin/users', admin.getParams(req, {
        title: 'Users - Restaurante Saboroso!'
    }))
})

module.exports = router