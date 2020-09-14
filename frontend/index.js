const entriesList = () => document.querySelector("#entries-list")

const baseURL = "http://localhost:3000"


document.addEventListener("DOMContentLoaded", callOnLoad)

/**
 * Loads page content and add event listeners to key elements.
 */
function callOnLoad(){
    loadEntries()
    loadCurrentDate()
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
    let date = dateInterval()

    date.start()
    setTimeout(date.stop,5*1000)
}

function dateInterval(){
    let id

    const start = () => {
        id = setInterval(renderDate,1*1000)
    }

    const stop = () => {
        clearInterval(id)
        id = undefined
    }

    return {
        start: start,
        stop: stop
    }
}

function renderDate(){
    let today = new Date()
    console.log(today)
}