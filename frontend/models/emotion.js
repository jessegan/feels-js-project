class Emotion {

    constructor(name){
        this.name = name
    }

    static getEmotions(id=undefined){
        if (id){
            return fetch(`${baseURL}/entries/${id}/emotions`)
                .then(resp => resp.json())
                .then(data => {
                    return this.createEmotions(data.data)
                })
        }
    }

    static createEmotions(emotionsData){
        let emotions = emotionsData.map(data => {
            let attrs = data.attributes
            
            return new Emotion(attrs.name)
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