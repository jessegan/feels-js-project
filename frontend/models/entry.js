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
    static create(id,rating,note,date,time){
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
    render(){
        let div = document.createElement('div')
        div.classList.add("entry-container")

        let year = document.createElement('span')
        year.classList.add("year-span")
        year.innerHTML = this.date.getFullYear()
        div.appendChild(year)

        let date = document.createElement('p')
        date.innerHTML = `${this.date.toLocaleDateString('default', {weekday: 'long'})} ${this.date.toLocaleString('default', {month: 'short'})} ${this.date.getDate()}`
        div.appendChild(date)

        let rating = document.createElement('p')
        rating.innerHTML = this.rating
        div.appendChild(rating)

        let note = document.createElement('p')
        note.classList.add("entry-note-default")
        note.innerHTML = this.note
        div.appendChild(note)

        let delete_button = document.createElement('a')
        delete_button.setAttribute("data-id",this.id)
        delete_button.innerHTML = "delete"
        delete_button.addEventListener("click",Entry.deleteFromButton)
        div.appendChild(delete_button)

        entriesList().appendChild(div)
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
                Entry.create(data.id,data.rating,data.note,data.date).render()
            })
            .catch(err => console.log(err))

        resetEntryForm()
    }


    static deleteFromButton(e){
        e.preventDefault()

        let entryId = this.getAttribute("data-id")

        console.log(entryId)
    }
}
