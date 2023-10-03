

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
            btnUpdate: "btn-update",
            btnDelete: "btn-delete",
            onUpdateLoad: (form, name, data)=>{
                let input = form.querySelector(`[name="${name}"]`)
                if (input) input.value = data[name]
            }
        }, configs)

        this.rows = [...document.querySelectorAll("table tbody tr")]

        this.initForms()
        this.initButtons()
    }

    initForms(){

        let formCreate = document.querySelector(this.options.formCreate);
        
        if (formCreate){
            
            formCreate.save({
                success: ()=>{
                    this.fireEvent("afterFormCreate")
                },
                failure: ()=>{
                    this.fireEvent("afterFormCreateError")
                }
            })
        }

        this.formUpdate = document.querySelector(this.options.formUpdate);

        if (this.formUpdate){

            this.formUpdate.save({
                success: ()=>{
                    this.fireEvent("afterFormUpdate")
                },
                failure: ()=>{
                    this.fireEvent("afterFormUpdateError")
                }
            })
        }
    }

    fireEvent(name, args){
        if (typeof this.options.listeners[name] === 'function') {this.options.listeners[name].apply(this, args)}
    }

    getTrData(e){
        let tr = e.composedPath()[2]
        // let tr = e.path.find(el => {
        //   return (el.tagName.toUpperCase() == "TR")
        // })
        let data = JSON.parse(tr.dataset.row)
        // console.log(data)
    }
    btnUpdateClick(e){
        this.fireEvent("beforeUpdateClick", [e])
          // let tr = e.currentTarget.parentNode.parentNode//não encontra o path
          let data = this.getTrData(e)

          for (let name in data) {

            this.options.onUpdateLoad(this.formUpdate, name, data);

            // formUpdate.querySelector(`[name="${name}"]`).value = data[name]

          }
          
          this.fireEvent("afterUpdateClick", [e])
    }
    btnDeleteClick(e){

        this.fireEvent("beforeDeleteClick")
          // let tr = e.currentTarget.parentNode.parentNode//não encontra o path
          let data = this.getTrData(e)
        if (confirm(eval("`" + this.options.DeleteMsg + "`"))){
            fetch(eval("`" + this.options.deleteUrl + "`"),{
              method: "delete"
            }).then(res => res.json())
              .then(json => {
                // window.location.reload()
                this.fireEvent("afterDeleteClick")
                
              })
          }
    }

    initButtons(){

        this.rows.forEach(row =>{
            let linha = [...document.querySelectorAll("row")]
            linha.forEach(btn =>{
                btn.addEventListener("click", (e)=>{
                    
                    if(e.target.classList.contains(this.btnUpdate)){
                        this.btnUpdateClick(e)
                    }else if(e.target.classList.contains(this.btnDelete)){
                        this.btnDeleteClick(e)
                    }else{
                        this.fireEvent('bottonClick', [e.target, this.getTrData(e)], e)
                    }
                })
            })
        })
        
    }
}