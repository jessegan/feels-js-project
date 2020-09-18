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

    // INSTANCE METHODS

    createModalDiv(){
        let div = document.createElement('div')
        div.classList.add("col-sm-auto","border","rounded-pill","mx-1")
        div.innerHTML = this.name

        return div
    }

    renderFormInput(){
        let form = entryForm()

        let input = document.createElement('input')
        input.type = 'checkbox'
        input.name = 'emotions'
        input.value = this.id
        input.id = `emotion-${this.id}`
        input.hidden = true

        form.appendChild(input)

        return input
    }

    renderModal(){
        let modal = emotionFormModal()

        let div = document.createElement('div')
        div.classList.add("py-2")

        let name = document.createElement('h6')
        name.innerHTML = this.name

        div.appendChild(name)

        modal.querySelector(".modal-body").appendChild(div)

        return div
    }

}