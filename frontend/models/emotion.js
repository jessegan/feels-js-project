class Emotion {

    static all = []

    /** CONSTRUCTORS */

    /**
     * Emotion constructor
     * 
     * @param {Int} id 
     * @param {String} name 
     */
    constructor(id,name){
        this.id = id
        this.name = name
    }

    /**
     * Create new Emotion object and persist in all
     * @param {Int} id 
     * @param {String} name 
     * 
     * @returns {Emotion} newly created Emotion object
     */
    static create(id,name){
        const emotion = new Emotion(id,name)

        this.all.push(emotion)

        return emotion
    }

    /** CLASS METHODS */

    /**
     * Send GET request to retrieve all or a specific Emotion from API
     * 
     * @param {Int} id 
     * 
     * @returns {Promise} Promise to fetch Emotion data, promise result is array of Emotion objects
     */
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

    /**
     * Create new Emotion objects based on emotions data from API
     * 
     * @param {Array<Objet>} emotionsData 
     * @param {Boolean} persist 
     * 
     * @returns {Array<Emotion>}
     */
    static createEmotions(emotionsData, persist=false){
        let emotions = emotionsData.map(data => {
            let attrs = data.attributes
            
            return persist ? Emotion.create(data.id,attrs.name) : new Emotion(data.id,attrs.name)
        })

        return emotions
    }

    /**
     * Find Emotion object in Emotion.all
     * @param {Int} id 
     * 
     * @returns {Emotion}
     */
    static find(id){
        return this.all.find(emotion => emotion.id == id)
    }

    /**
     * Resets emotions elements on entry form and then renders emotion elements
     */
    static renderEmotionsOnForm(){
        emotionFormCheckboxes().innerHTML = ""
        emotionFormModalBody().innerHTML = ""
        emotionFormContainer().innerHTML = ""

        // render elements on form and modal for each Emotion
        this.all.forEach(emotion => {
            emotion.renderFormInput()
            emotion.renderModal()
        })
    }

    /** INSTANCE METHODS */ 

    /**
     * Create a div for Emotion on Entry modal
     * 
     * @returns {Node}
     */
    createModalDiv(){
        let div = document.createElement('div')
        div.classList.add("col-sm-auto","border","rounded-pill","mx-1")
        div.innerHTML = this.name

        return div
    }

    /**
     * Create a div for Emotion on entry form
     * 
     * @returns {Node}
     */
    createFormDiv(){
        let div = document.createElement('div')
        div.classList.add("col-sm-auto","border","rounded-pill","mx-1","my-1")
        div.id = `form-emotion-div-${this.id}`
        div.innerHTML = this.name

        return div
    }

    /**
     * Create checkboxes for Emotion on entry form
     */
    renderFormInput(){
        let checkboxes = emotionFormCheckboxes()

        let input = document.createElement('input')
        input.type = 'checkbox'
        input.name = 'emotions'
        input.value = this.id
        input.id = `emotion-checkbox-${this.id}`
        input.hidden = true

        checkboxes.appendChild(input)

        return input
    }

    /**
     * Create div for Emotion in emotions modal in entry form
     */
    renderModal(){
        let modalBody = emotionFormModalBody()

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

        modalBody.appendChild(div)

        return div
    }

}