class Emotion {

    constructor(id,name){
        this.id = id
        this.name = name
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
            
            return new Emotion(data.id,attrs.name)
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