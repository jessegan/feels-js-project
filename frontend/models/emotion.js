class Emotion {

    static all = []

    constructor(id,name){
        this.id = id
        this.name = name
    }

    static create(id,name){
        const emotion = new Emotion(id,name)

        self.all.push(emotion)

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
                    return this.createEmotions(data.data)
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

    createModalDiv(){
        let div = document.createElement('div')
        div.classList.add("col-sm-auto","border","rounded-pill","mx-1")
        div.innerHTML = this.name

        return div
    }

}