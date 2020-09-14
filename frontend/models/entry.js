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
     * @param {String} time 
     */
    constructor(id,rating,note,date,time){
        this.id=id
        this.rating=rating
        this.note=note
        this.date= new Date(date)
        this.time=time
    }

    /**
     * Construct a new Entry and save in class variable
     * 
     * @param {Integer} id 
     * @param {Integer} rating 
     * @param {String} note 
     * @param {String} date 
     * @param {String} time 
     * 
     * @return {Entry} newly constructed Entry
     */
    static create(id,rating,note,date,time){
        let entry = new Entry(id,rating,note,date,time)

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
            Entry.create(attrs.id, attrs.rating, attrs.note, attrs.date, attrs.time)
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

        entriesList().appendChild(div)
    }


    // CLASS METHODS

    /**
     * Renders all Entry objects to the document
     * 
     */
    static renderEntries(){
        this.all.forEach(entry => {
            entry.render()
        })
    }

}