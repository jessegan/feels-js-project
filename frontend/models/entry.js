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
    constructor(id,rating,note,date){
        this.id=id
        this.rating=rating
        this.note=note
        this.date= new Date(date)
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
    static create(id,rating,note,date){
        let entry = new Entry(id,rating,note,date)

        this.all.push(entry)

        return entry
    }

    /**
     * Given an array of Entry data, create new Entry objects for each set of data
     * 
     * @param {Array<Object>} entriesData  array of Objects containing data to create Entries
     */
    static createEntries(entriesData){
        entriesData.forEach(data => {
            let attrs = data.attributes
            Entry.create(attrs.id, attrs.rating, attrs.note, attrs.date)
        })
    }

    // INSTANCE METHODS

    /**
     * Adds entry div to document
     */
    render(append=true){
        let div = document.createElement('div')
        div.classList.add("h-100","mx-3","border","border-primary", "rounded-circle","text-center","align-middle")
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

        let delete_button = document.createElement('button')
        delete_button.classList.add("btn","btn-danger","btn-sm")
        delete_button.setAttribute("data-id",this.id)
        delete_button.innerHTML = "Delete"
        delete_button.addEventListener("click",Entry.deleteFromButton)
        div.appendChild(delete_button)

        append ? entriesList().appendChild(div) : entriesList().prepend(div)
    }


    // CLASS METHODS

    /**
     * Clears entries list and then renders all Entry objects to the document
     * 
     */
    static renderEntries(){
        entriesList().innerHTML = ""

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

        // create strong params for entry data
        const strongParams = {
            entry: {
                rating: this.querySelector(".rating-slider").value,
                note: this.querySelector(".note-textarea").value
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
                let data = entryData.data.attributes
                Entry.create(data.id,data.rating,data.note,data.date).render(false)
            })
            .catch(err => console.log(err))

        resetEntryForm()
    }


    static deleteFromButton(e){
        e.preventDefault()

        let entryId = this.getAttribute("data-id")
        let entryDiv = this.parentNode

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
