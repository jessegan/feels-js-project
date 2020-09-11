const entriesList = () => document.querySelector("#entries-list")

const baseURL = "http://localhost:3000"


document.addEventListener("DOMContentLoaded", callOnLoad)

/**
 * Loads page content and add event listeners to key elements.
 * 
 */
function callOnLoad(){
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