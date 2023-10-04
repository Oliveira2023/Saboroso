let conn = require ('./db');

class Pagination{

    constructor(
        query,
        params=[],
        itensPerPage = 10
    ){
        this.query = query;
        this.params = params;
        this.itensPerPage = itensPerPage
        this.currentPage = 1
    }

    getPage(page){

        this.currentPage = page -1
        this.params.push(
            this.currentPage * this.itensPerPage,
            this.itensPerPage
        )
        return new Promise((resolve, reject)=>{
            conn.query([this.query, "select found_rows() as Total"].join(';'), this.params, (err, results)=>{
                if (err){
                    reject(err)
                }else{
                    this.data = results[0]
                    this.total = results[1][0].Total
                    this.totalPages = Math.ceil(this.total/this.itensPerPage)
                    this.currentPage++

                    resolve(this.data)
                }
            })
        })
    }
    getTotal(){
        return this.total
    }
    getCurrentPage(){
        return this.currentPage
    }
    getTotalPages(){
        return totalPages
    }
}

module.exports = Pagination