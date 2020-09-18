const entriesList = () => document.querySelector("#entries-list")
const dateContainer = () => document.querySelector("#date-container")
const entryForm = () => document.querySelector("#entry-form")
const entryModal = () => document.querySelector("#entryModal")
const emotionFormModal = () => document.querySelector("#emotionFormModal")

const baseURL = "http://localhost:3000"


document.addEventListener("DOMContentLoaded", callOnLoad)

/**
 * Loads page content and add event listeners to key elements.
 */
function callOnLoad(){
    loadCurrentDate()
    loadEntries()
    
    loadEmotionsForm()
    entryForm().querySelector("#add-emotion-btn").addEventListener("click",e=>e.preventDefault())
    entryForm().addEventListener("submit",Entry.createFromForm)

    document.querySelector("#scroll-left").addEventListener("click",scrollEntriesList.bind(null,-750))
    document.querySelector("#scroll-right").addEventListener("click",scrollEntriesList.bind(null,750))
}

/**
 * Fetch entries data and then renders entries
 */
function loadEntries(){

    fetch(`${baseURL}/entries`)
        .then(resp => resp.json())
        .then(data => {
            Entry.createEntries(data.data)
                .then(()=>{
                    Entry.renderEntries()
                })
        })
        .catch(errors => console.log(errors))
}

/**
 * Load the current date and time on the page and set timeout for changing time
 */
function loadCurrentDate(){
    renderDate()

    let date = dateInterval()

    date.start()
}

/**
 * Return an object for the dateInterval that starts and stop an interval to update the date
 */
function dateInterval(){
    let id

    // Sets and interval to render the date and time on the page
    const start = () => {
        id = setInterval(renderDate,1*1000)
    }

    // Clears the interval set if id has been set
    const stop = () => {
        clearInterval(id)
        id = undefined
    }

    return {
        start: start,
        stop: stop
    }
}

/**
 * Renders the date and time onto the page
 */
function renderDate(){
    dateContainer().innerHTML = ""

    let current = new Date()

    let date = document.createElement('h1')
    date.innerHTML = `${current.toLocaleDateString('default', {weekday: 'long'})}, ${current.toLocaleString('default', {month: 'short'})} ${current.getDate()}`

    let time = document.createElement('h3')
    time.innerHTML = `${current.toLocaleTimeString([],{hour12: true, hour: "numeric", minute: "2-digit", second: "2-digit"})}`

    dateContainer().appendChild(date)
    dateContainer().appendChild(time)
}

/**
 * Fetch emotions from API, load selection options into Entry form
 */
function loadEmotionsForm(){
    // fetch name and id of each emotion
    Emotion.getEmotions()
        .then(()=>Emotion.renderEmotionsOnForm())
}

/**
 * Creates object with functions to add or remove an emotion to the form based on button calling it
 */
function emotionFormFunctions(){
    let emotionId = this.getAttribute("data-id")
    let added = false

    const add = () => {
        // Add to form
        document.querySelector("#form-emotions-container").prepend(Emotion.find(emotionId).createFormDiv())

        // Toggle checkbox on
        document.querySelector(`#emotion-checkbox-${emotionId}`).checked = true
        // Change button name
        this.innerHTML = "Remove"
        // Change button color
        this.classList.remove("btn-primary")
        this.classList.add("btn-danger")
        // Change added to True
        added = true
    }

    const remove = () => {
        let div = document.querySelector(`#form-emotion-div-${emotionId}`)
        div.parentNode.removeChild(div)

        document.querySelector(`#emotion-checkbox-${emotionId}`).checked = false

        this.innerHTML = "Add"

        this.classList.remove("btn-danger")
        this.classList.add("btn-primary")

        added=false
    }

    const toggle = e => {
        e.preventDefault()
        added ? remove() : add()
    }

    return toggle
}


function resetEntryForm(){
    entryForm().querySelector(".rating-slider").value = 50
    Emotion.renderEmotionsOnForm()
}


function scrollEntriesList(px,e){
    entriesList().scrollLeft += px
}