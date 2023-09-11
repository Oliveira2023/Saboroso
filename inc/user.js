var conn = require('./../inc/db');

module.exports = {
    
    render(req, res, error){

        res.render('admin/login', {
            body: req.body,
            error
        })
    },
    login(email, password){

        return new Promise((resolve, reject)=>{
            
            conn.query(`select * from tb_users where email = ? and password = ?`, [email, password], (err, results)=>{
                
                if (err){
                    reject(err)
                }else{
                    if (!results.length > 0){
                    reject("Usuário ou senha incorretos")
                    }else{

                    let row = results[0]
                    if (row.password !== password){
                        reject("Usuário ou senha incorretos")
                    }else{
                        resolve(row)
                    }
                    }
                }
                
            })
        })
    }
}