HTMLElement.prototype.save = function(config){

    let form  = this;
    // console.log("FORM",form)
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        
        let formData = new FormData(form)

        fetch(form.action, {
            method: form.method,
            body: formData
        })
        .then(res => res.json())
        .then(json => {
            if (json.error){
                if (typeof config.failure === 'function'){
                    config.failure(json.error)
                }
            }else{
                if (typeof config.success === 'function'){
                    config.success(json)
                }
            }
            
        }).catch(err => {
            if (typeof config.error === 'function'){
                config.failure(err)
            }
        })
    })
}