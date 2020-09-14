const entriesList = () => document.querySelector("#entries-list")
const dateContainer = () => document.querySelector("#date-container")

const baseURL = "http://localhost:3000"


document.addEventListener("DOMContentLoaded", callOnLoad)

/**
 * Loads page content and add event listeners to key elements.
 */
function callOnLoad(){
    loadCurrentDate()
    loadEntries()
}

/**
 * Fetch entries data and then renders entries
 */
function loadEntries(){

    fetch(`${baseURL}/entries`)
        .then(resp => resp.json())
        .then(data => {
            Entry.createEntries(data.data)
            Entry.renderEntries()
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
    date.innerHTML = `${current.toLocaleDateString('default', {weekday: 'long'})} ${current.toLocaleString('default', {month: 'short'})} ${current.getDate()}`

    let time = document.createElement('h3')
    time.innerHTML = `${current.toLocaleTimeString([],{hour12: true, hour: "numeric", minute: "2-digit", second: "2-digit"})}`

    dateContainer().appendChild(date)
    dateContainer().appendChild(time)
}