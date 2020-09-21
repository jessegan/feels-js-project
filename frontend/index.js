/** QUERY SELECTOR METHODS */

// entries list
const entriesList = () => document.querySelector("#entries-list")
const entryDiv = id => document.querySelector(`#entry-${id}`)
const entryModal = () => document.querySelector("#entryModal")
const entryModalTitle = () => entryModal().querySelector(".modal-title")
const entryModalRating = () => entryModal().querySelector(".rating-value")
const entryModalEmotions = () => entryModal().querySelector(".emotions-list")
const entryModalDeleteButton = () => entryModal().querySelector(".modal-footer button")

// date and time
const dateContainer = () => document.querySelector("#date-container")

// entry form
const entryForm = () => document.querySelector("#entry-form")
const addEmotionButton = () => entryForm().querySelector("#add-emotion-btn")
const ratingSlider = () => entryForm().querySelector(".rating-slider")
const emotionFormModal = () => document.querySelector("#emotionFormModal")
const emotionFormModalBody = () => emotionFormModal().querySelector(".modal-body")
const emotionFormCheckboxes = () => document.querySelector("#form-emotions-checkboxes")
const emotionFormCheckbox = id => emotionFormCheckboxes().querySelector(`#emotion-checkbox-${id}`)
const emotionFormContainer = () => document.querySelector("#form-emotions-container")
const emotionFormDiv = id => emotionFormContainer().querySelector(`#form-emotion-div-${id}`)
const emotionFormCheckedEmotions = () => document.querySelectorAll('input[name=emotions]:checked')

// scroll buttons
const leftScrollButton = () => document.querySelector("#scroll-left")
const rightScrollButton = () => document.querySelector("#scroll-right")

const baseURL = "http://localhost:3000"


document.addEventListener("DOMContentLoaded", callOnLoad)

/**
 * Loads page content and add event listeners to key elements.
 */
function callOnLoad(){
    loadCurrentDate()
    loadEntries()
    
    loadEmotionsForm()
    addEmotionButton().addEventListener("click",e=>e.preventDefault())
    entryForm().addEventListener("submit",Entry.createFromForm)

    leftScrollButton().addEventListener("click",scrollEntriesList.bind(null,-750))
    rightScrollButton().addEventListener("click",scrollEntriesList.bind(null,750))
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
        emotionFormContainer().prepend(Emotion.find(emotionId).createFormDiv())

        // Toggle checkbox on
        emotionFormCheckbox(emotionId).checked = true
        // Change button name
        this.innerHTML = "Remove"
        // Change button color
        this.classList.remove("btn-primary")
        this.classList.add("btn-danger")
        // Change added to True
        added = true
    }

    const remove = () => {
        let div = emotionFormDiv(emotionId)
        div.parentNode.removeChild(div)

        emotionFormCheckbox(emotionId).checked = false

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
    ratingSlider().value = 50
    Emotion.renderEmotionsOnForm()
}


function scrollEntriesList(px,e){
    entriesList().scrollLeft += px
}