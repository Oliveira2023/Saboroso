class HcodeFileReader {

    constructor(inputEl, imgEl) {
        this.inputEl = inputEl;
        this.imgEl = imgEl;

        this.initInputEvent()
    }

    initInputEvent() {
        
        document.querySelector(this.inputEl).addEventListener('change', (e) => {
            this.reader(e.target.files[0]).then(result => {
                document.querySelector(this.imgEl).src = result;
            })
        })
    }

    reader(file) {
        
        return new Promise((resolve, reject) => {
            
            let reader = new FileReader();
        reader.onload = (e) => {
            resolve(reader.result)
        }
        reader.onerror = (e) => {
            reject("Erro ao ler arquivo")
        }
        reader.readAsDataURL(file);

        })
        
    }
}