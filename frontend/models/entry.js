class Entry {
    static all = []

    // CONSTRUCTORS

    /**
     * Entry constructor
     * 
     * @param {Integer} id 
     * @param {Integer} rating 
     * @param {String} note 
     * @param {String} date 
     */
    constructor(id,rating,note,date,emotions = []){
        this.id=id
        this.rating=rating
        this.note=note
        this.date= new Date(date)

        this.emotions = emotions
    }

    /**
     * Construct a new Entry and save in class variable
     * 
     * @param {Integer} id 
     * @param {Integer} rating 
     * @param {String} note 
     * @param {String} date 
     * 
     * @return {Entry} newly constructed Entry
     */
    static create(id,rating,note,date,emotions=[]){
        let entry = new Entry(id,rating,note,date,emotions)

        this.all.push(entry)

        return entry
    }

    /**
     * Given an array of Entry data, create new Entry objects for each set of data
     * 
     * @param {Array<Object>} entriesData  array of Objects containing data to create Entries
     */
    static createEntries(entriesData){
        return Promise.all(
            entriesData.map(data => {
                let attrs = data.attributes

                return Emotion.getEmotions(attrs.id)
                    .then(emotions => {
                        return Entry.create(attrs.id, attrs.rating, attrs.note, attrs.date,emotions)
                    })            
            })
        )
    }

    // INSTANCE METHODS

    /**
     * Adds entry div to document
     */
    render(append=true){
        let div = document.createElement('div')
        div.id = `entry-${this.id}`
        div.classList.add("mx-3","border","border-primary", "rounded-circle","text-center","align-middle")
        div.classList.add("entry-container")

        let year = document.createElement('span')
        year.classList.add("year-span","align-middle")
        year.innerHTML = this.date.getFullYear()
        div.appendChild(year)

        let date = document.createElement('h5')
        date.innerHTML = `${this.date.toLocaleDateString('default', {weekday: 'short'})}, ${this.date.toLocaleString('default', {month: 'short'})} ${this.date.getDate()}`
        div.appendChild(date)

        let rating = document.createElement('h1')
        rating.innerHTML = this.rating
        div.appendChild(rating)

        let view_button = document.createElement('button')
        view_button.classList.add("btn","btn-primary","btn-sm")
        view_button.setAttribute("data-id",this.id)
        view_button.setAttribute("data-toggle","modal")
        view_button.setAttribute("data-target","#entryModal")
        view_button.innerHTML = "View"

        view_button.addEventListener("click",Entry.renderModal.bind(this))
        
        div.appendChild(view_button)

        append ? entriesList().appendChild(div) : entriesList().prepend(div)
    }

    /**
     * 
     */
    static renderModal(){
        let title = entryModal().querySelector(".modal-title")
        title.innerHTML = `${this.date.toLocaleDateString('default', {weekday: 'long'})}, ${this.date.toLocaleString('default', {month: 'short'})} ${this.date.getDate()} ${this.date.getFullYear()}`

        let rating = entryModal().querySelector(".rating-value")
        rating.innerHTML = this.rating

        let emotionsContainer = entryModal().querySelector(".emotions-list")
        emotionsContainer.innerHTML = ""
        this.emotions.forEach(e => {
            emotionsContainer.appendChild(e.createModalDiv())
        })

        let old_button = entryModal().querySelector(".modal-footer button")
        let new_button = old_button.cloneNode(true)
        new_button.setAttribute("data-id",this.id)
        new_button.addEventListener("click",Entry.deleteFromButton)
        old_button.parentNode.replaceChild(new_button,old_button)

    }


    // CLASS METHODS

    /**
     * Clears entries list and then renders all Entry objects to the document
     * 
     */
    static renderEntries(){
        entriesList().innerHTML = ""

        this.all = this.all.sort((a,b) => b.date.getTime() - a.date.getTime())

        this.all.forEach(entry => {
            entry.render()
        })
    }

    /**
     * Creates a new Entry based on data passed in from form submission
     * 
     * @param {*} e 
     */
    static createFromForm(e){
        // prevent default submit behavior
        e.preventDefault()

        // handle emotion checkboxes
        const emotionCheckboxes = document.querySelectorAll('input[name=emotions]:checked')


        // create strong params for entry data
        const strongParams = {
            entry: {
                rating: this.querySelector(".rating-slider").value,
                emotion_ids: Array.from(emotionCheckboxes,checkbox => checkbox.value)
            }
        }

        // setup config object for post request
        const config = {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(strongParams)
        }

        // post request for creating new entry
        fetch(`${baseURL}/entries`,config)
            .then(resp => resp.json())
            .then(entryData => {
                Entry.createEntries([entryData.data])
                    .then(res => res[0].render(false))
            })
            .catch(err => console.log(err))

        resetEntryForm()
    }


    static deleteFromButton(e){

        let entryId = this.getAttribute("data-id")
        let entryDiv = document.querySelector(`#entry-${entryId}`)

        const config = {
            method: 'DELETE',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }

        fetch(`${baseURL}/entries/${entryId}`,config)
            .then(resp => resp.json())
            .then(data => {
                // Delete Entry
                Entry.all = Entry.all.filter(entry => entry.id !== data.data.id)

                // Remove entry from page
                entryDiv.parentNode.removeChild(entryDiv)
            })
            .catch(err => console.log(err))
    }
}
