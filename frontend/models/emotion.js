class Emotion {

    static all = []

    constructor(id,name){
        this.id = id
        this.name = name
    }

    static create(id,name){
        const emotion = new Emotion(id,name)

        this.all.push(emotion)

        return emotion
    }

    static getEmotions(id=undefined){
        if (id){
            return fetch(`${baseURL}/entries/${id}/emotions`)
                .then(resp => resp.json())
                .then(data => {
                    return this.createEmotions(data.data)
                })
        } else {
            return fetch(`${baseURL}/emotions`)
                .then(resp => resp.json(), error => console.log(error))
                .then(data => {
                    return this.createEmotions(data.data,true)
                })
        }
    }

    static createEmotions(emotionsData, persist=false){
        let emotions = emotionsData.map(data => {
            let attrs = data.attributes
            
            return persist ? Emotion.create(data.id,attrs.name) : new Emotion(data.id,attrs.name)
        })

        return emotions
    }

    static find(id){
        return this.all.find(emotion => emotion.id == id)
    }

    // INSTANCE METHODS

    createModalDiv(){
        let div = document.createElement('div')
        div.classList.add("col-sm-auto","border","rounded-pill","mx-1")
        div.innerHTML = this.name

        return div
    }

    createFormDiv(){
        let div = document.createElement('div')
        div.classList.add("col-sm-auto","border","rounded-pill","mx-1","my-1")
        div.id = `form-emotion-div-${this.id}`
        div.innerHTML = this.name

        return div
    }

    renderFormInput(){
        let form = entryForm()

        let input = document.createElement('input')
        input.type = 'checkbox'
        input.name = 'emotions'
        input.value = this.id
        input.id = `emotion-checkbox-${this.id}`
        input.hidden = true

        form.appendChild(input)

        return input
    }

    renderModal(){
        let modal = emotionFormModal()

        let div = document.createElement('div')
        div.classList.add("py-2","border-top","border-bottom")

        let name = document.createElement('h6')
        name.classList.add("d-inline")
        name.innerHTML = this.name
        div.appendChild(name)

        let btn = document.createElement('button')
        btn.classList.add("btn","btn-primary","btn-sm","rounded-pill","mx-5")
        btn.setAttribute("data-id",this.id)
        btn.innerHTML = "Add"

        const toggleFunc = emotionFormFunctions.call(btn)
        btn.addEventListener("click",toggleFunc)

        div.appendChild(btn)

        modal.querySelector(".modal-body").appendChild(div)

        return div
    }

}