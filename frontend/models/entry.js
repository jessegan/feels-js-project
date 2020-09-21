class Entry {
    static all = []

    // CONSTRUCTORS

    /**
     * Entry constructor
     * 
     * @param {Integer} id 
     * @param {Integer} rating 
     * @param {String} date 
     * @param {Array<Emotion>} emotions
     */
    constructor(id,rating,date,emotions = []){
        this.id=id
        this.rating=rating
        this.date= new Date(date)

        this.emotions = emotions
    }

    /**
     * Construct a new Entry and save in class variable
     * 
     * @param {Integer} id 
     * @param {Integer} rating 
     * @param {String} date 
     * @param {Array<Emotion>} emotions
     * 
     * @return {Entry} newly constructed Entry
     */
    static create(id,rating,date,emotions=[]){
        let entry = new Entry(id,rating,date,emotions)

        this.all.push(entry)

        return entry
    }

    /**
     * Given an array of Entry data, create new Entry objects for each set of data
     * 
     * @param {Array<Object>} entriesData  array of Objects containing data to create Entries
     * 
     * @returns {Promise} promise to create new Entry objects from entriesData, promise result contains array of Entry objects
     */
    static createEntries(entriesData){
        return Promise.all(
            // Iterates through each entry
            entriesData.map(data => {
                let attrs = data.attributes

                // Fetch and create Emotion objects, then return newly created Entry object
                return Emotion.getEmotions(attrs.id) // Promise result is array of Emotion objects
                    .then(emotions => {
                        return Entry.create(attrs.id, attrs.rating, attrs.date,emotions)
                    })            
            })
        )
    }

    // INSTANCE METHODS

    /**
     * Adds entry div to document, append or prepend based on append boolean value
     * 
     * @param {boolean} append
     */
    render(append=true){
        // create div for Entry and assign classes + attributes
        let div = document.createElement('div')
        div.id = `entry-${this.id}`
        div.classList.add("mx-3","border","border-primary", "rounded-circle","text-center","align-middle")
        div.classList.add("entry-container")

        // create span for entry year and append to div
        let year = document.createElement('span')
        year.classList.add("year-span","align-middle")
        year.innerHTML = this.date.getFullYear()
        div.appendChild(year)

        // create header for date and append to div
        let date = document.createElement('h5')
        date.innerHTML = `${this.date.toLocaleDateString('default', {weekday: 'short'})}, ${this.date.toLocaleString('default', {month: 'short'})} ${this.date.getDate()}`
        div.appendChild(date)

        // create header for rating and append to div
        let rating = document.createElement('h1')
        rating.innerHTML = this.rating
        div.appendChild(rating)

        // create button to view modal and append to div
        let view_button = document.createElement('button')
        view_button.classList.add("btn","btn-primary","btn-sm")
        view_button.setAttribute("data-id",this.id)
        view_button.setAttribute("data-toggle","modal")
        view_button.setAttribute("data-target","#entryModal")
        view_button.innerHTML = "View"

        view_button.addEventListener("click",Entry.renderModal.bind(this))
        
        div.appendChild(view_button)

        // append or prepend div to entries list
        append ? entriesList().appendChild(div) : entriesList().prepend(div)
    }

    /**
     * Updates entry modal with data based on Entry object called with this function
     */
    static renderModal(){
        // update entry modal title
        let title = entryModalTitle()
        title.innerHTML = `${this.date.toLocaleDateString('default', {weekday: 'long'})}, ${this.date.toLocaleString('default', {month: 'short'})} ${this.date.getDate()} ${this.date.getFullYear()}`

        // update entry modal rating
        let rating = entryModalRating()
        rating.innerHTML = this.rating

        // update entry modal emotions container
        let emotionsContainer = entryModalEmotions()
        emotionsContainer.innerHTML = ""
        this.emotions.forEach(e => {
            emotionsContainer.appendChild(e.createModalDiv())
        })

        // update entry modal delete button
        let old_button = entryModalDeleteButton()
        let new_button = old_button.cloneNode(true)
        new_button.setAttribute("data-id",this.id)
        new_button.addEventListener("click",Entry.deleteFromButton)
        old_button.parentNode.replaceChild(new_button,old_button)
    }


    // CLASS METHODS

    /**
     * Clears entries list and then renders all Entry objects to the document
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
     * @param {Event} e 
     */
    static createFromForm(e){
        // prevent default submit behavior
        e.preventDefault()

        // handle emotion checkboxes
        const emotionCheckboxes = emotionFormCheckedEmotions()

        // create strong params for entry data
        const strongParams = {
            entry: {
                rating: ratingSlider().value,
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

    /**
     * Delete Entry from page and send DELETE request to API
     * 
     * @param {Event} e 
     */
    static deleteFromButton(e){

        let entryId = this.getAttribute("data-id")
        let div = entryDiv(entryId)

        // create config object
        const config = {
            method: 'DELETE',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }

        // send DELETE request and then delete Entry object
        fetch(`${baseURL}/entries/${entryId}`,config)
            .then(resp => resp.json())
            .then(data => {
                // Delete Entry
                Entry.all = Entry.all.filter(entry => entry.id !== data.data.id)

                // Remove entry from page
                div.parentNode.removeChild(div)
            })
            .catch(err => console.log(err))
    }
}
