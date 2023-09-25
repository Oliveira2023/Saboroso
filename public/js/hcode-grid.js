
class HcodeGrid {
     
    constructor(configs){
        
        configs.listeners = Object.assign({
            afterUpdateClick: (e)=>{
                $('#modal-update').modal('show')
            },
            afterDeleteClick: (e)=>{
                // window.location.reload()
            },
            afterFormCreate: (e)=>{
                // window.location.reload()
            },
            afterFormUpdate: (e)=>{
                // window.location.reload()
            },
            afterFormCreateError: (e)=>{
                alert("Erro ao criar")
            },
            afterFormUpdateError: (e)=>{
                alert("Erro ao atualizar")
            },
        }, configs.listeners);
        this.options = Object.assign({},{
            formCreate: "#modal-create",
            formUpdate: "#modal-update",
            btnUpdate: ".btn-update",
            btnDelete: ".btn-delete",
        }, configs)

        this.initForms()
        this.initButtons()
    }
    initForms(){
        
        this.formCreate = document.querySelector(this.options.formCreate);

        this.formCreate.save().then(json=>{
            this.fireEvent("afterFormCreate")

        }).catch(err=>{

            this.fireEvent("afterFormCreateError")

        })
      
        this.formUpdate = document.querySelector(this.options.formUpdate);
      
        this.formUpdate.save().then(json=>{

            this.fireEvent("afterFormUpdate")

        }).catch(err=>{

            this.fireEvent("afterFormUpdateError")

        })
    }

    fireEvent(name, args){
        if (typeof this.options.listeners[name] === 'function') this.options.listeners[name].apply(this, args)
    }

    getTrData(e){
        let tr = e.composedPath()[2]
        // let tr = e.path.find(el => {
        //   return (el.tagName.toUpperCase() == "TR")
        // })
        let data = JSON.parse(tr.dataset.row)
        // console.log(data)
    }

    initButtons(){
        
      let btnUpdate = [...document.querySelectorAll(this.options.btnUpdate)]
      
      btnUpdate.forEach(btn =>{ 
        
        btn.addEventListener("click", (e)=>{

            this.fireEvent("beforeUpdateClick", [e])
          // let tr = e.currentTarget.parentNode.parentNode//não encontra o path
          let data = this.getTrData(e)

          for (let name in data) {

            this.options.onUpdateLoad(this.formUpdate, name, data);

            // formUpdate.querySelector(`[name="${name}"]`).value = data[name]

          }
          
          this.fireEvent("afterUpdateClick", [e])
          // let tr = e.path.find(el => {
          //   return (el.tagName.toUpperCase() == "TR")
          // })
          // console.log(tr)
        })
      })
      let btnDelete = [...document.querySelectorAll(this.options.btnDelete)]
      btnDelete.forEach(btn =>{
        btn.addEventListener("click", (e)=>{

            this.fireEvent("beforeDeleteClick", [e])
          // let tr = e.currentTarget.parentNode.parentNode//não encontra o path
          let data = this.getTrData(e)

          if (confirm(eval("`" + this.options.msgDelete + "`"))){
            fetch(eval("`" + this.options.deleteUrl + "`"),{
              method: "delete"
            }).then(res => res.json())
              .then(json => {
                // window.location.reload()
                this.fireEvent("afterDeleteClick")
                console.log(json)
              })
          }

        })
      })
    }
}