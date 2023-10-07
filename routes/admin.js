var express = require('express');
const user = require('../inc/user');
var router = express.Router();
var admin = require('../inc/admin');
var menus = require('../inc/menus');
var reservations = require('../inc/reservations');
var moment = require('moment');
var contacts = require('../inc/contacts');
var emails = require('../inc/emails');


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

    emails.getEmails().then(data=>{
        res.render('admin/emails', admin.getParams(req, {
            data
        }))
    })
})
router.delete("/emails/:id", function(req, res, next){
    emails.delete(req.params.id).then(results=>{
        res.send(results)
    }).catch(err=>{
        res.send(err)
    })
})

router.get('/reservations', function(req, res, next){

    let start = (req.query.start) ? req.query.start : moment().subtract(1,'year').format('YYYY-MM-DD');
    let end = (req.query.end) ? req.query.end : moment().format('YYYY-MM-DD');

    reservations.getReservations(req).then(pag=>{
        res.render('admin/reservations', admin.getParams(req, {
            title: 'Reservations - Restaurante Saboroso!',
            date: {
                start,
                end
            },
            data: pag.data,
            moment,
            links: pag.links
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

    contacts.getContacts().then(data=>{
        res.render('admin/contacts', admin.getParams(req, {
            data,
            title: 'Contacts - Restaurante Saboroso!'
        }))
    })
})
router.delete("/contacts/:id", function(req, res, next){
    contacts.delete(req.params.id).then(results=>{
        res.send(results)
    }).catch(err=>{
        res.send(err)
    })
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
    
    user.getUsers().then(data=>{
        res.render('admin/users', admin.getParams(req, {
            data
        }))
    })
    
})
router.post('/users', function(req, res, next){
    
    user.save(req.fields).then(results=>{
        res.send(results)
    }).catch(err=>{
        res.send(err)
    })
})

router.post("/users/password-chage/", function(req, res, next){
    user.changePassword(req).then(results=>{
        res.send(results)
    }).catch(err=>{
        res.send({
            error: err
        })
    })
})

router.delete('/users:id', function(req, res, next){
    
    user.delete(req.params.id).then(results=>{
        res.send(results)
    }).catch(err=>{
        res.send(err)
    })
})

module.exports = router