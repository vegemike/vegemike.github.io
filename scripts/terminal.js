//https://vegemike.github.io/reviews/music?name=review+of+something&id=idOfPost
params = new URLSearchParams(window.location.search);
pID = params.get('id');
var entryJSON
var toptitlething = document.getElementById("titley").textContent

//set category to current folder (e.g. tv, misc etc)
splitURL = String(document.URL).split("/")
offset = 0
if (document.getElementById("pathToGenerator") != null ){
    offset = 1
}
category = splitURL[splitURL.length-(2+offset)]
subCategory = splitURL[splitURL.length-(3+offset)]
//encodeURIComponent(name)
//params.set("example", "test");  set a qury value
//history.pushState(null, "", "?" + params.toString());   sets query
//history.replaceState(null, "", window.location.pathname);  clears query

const parentDiv = document.getElementById("commands")
var commands = Array.from(parentDiv.children)
const delay = ms => new Promise(res => setTimeout(res, ms));
var highlightedCommand = 0

async function addEntries(skip = false){
    console.log("generating anchors from JSON")
    jsonPath = "../../entries.json"
    if (document.getElementById("pathToGenerator")!=null)
        {jsonPath = "../../../entries.json"}
    const entries = await getJson(jsonPath)
    if (!skip){
        for (let x of entries[subCategory][category]){
            let entry = document.createElement("a")
            entry.textContent = `> ${x["name"]} - ${x["date"]}`
            entry.style.display = "none"
            entry.id = entries[subCategory][category].indexOf(x)
            entry.classList.add("entry")
            parentDiv.appendChild(entry)

        }
    }
    console.log("finished generation")
    console.log(entries[subCategory])
    return entries[subCategory]
}

async function delayLoad(){
    console.log("staggering display...")
    for (let x of parentDiv.children){
        x.style.display = "block"
        await delay(120)
    }
    console.log("displayed all")
}






async function unloadEntry() {
    //restore style.display.block to all the commands and delete all children of #textHere as well as the button itself
    //done
    document.getElementById("textHere").innerHTML = ""
    document.getElementById("titley").textContent = toptitlething
    if (localStorage.getItem("fromAll") != "true"){
        newLink = window.location.pathname.replace(/\/[^/]+\.html$/, "/")
        newLink = newLink.split("/")
        newLink.pop()
        if (document.getElementById("pathToGenerator") != null){
            newLink.pop()
        }
        newLink = newLink.join("/")
        window.location.replace(newLink)
    }
    else {
        localStorage.setItem("fromAll", "false")
        window.location.href = "../../../all/"
    }
}





async function setup(skipEntries = false) {
    parentDiv.innerHTML = '<a href="../../" class="command">> back</a>'
    entryJSON = await addEntries(skipEntries)
    console.log(entryJSON)
    
    if (!skipEntries) {
        await delayLoad()
        entriesList = document.querySelectorAll('.entry');
        var commands = Array.from(parentDiv.children)
        entriesList.forEach(
            element => {
            element.addEventListener('click', function () {
                loadEntry(this.id);
            });
            }
        );
        function updateCommandClass(index) {
            commands.forEach(child => {
            child.classList.remove('command');
            });
            if (index >= 0 && index < commands.length) {
            commands[index].classList.add('command');
            }
        }
        function handleKeyDown(event) {
            if (event.key === 'ArrowDown') {
                //  down
                highlightedCommand = (highlightedCommand + 1) % commands.length;
                updateCommandClass(highlightedCommand);
            } else if (event.key === 'ArrowUp') {
                // up
                highlightedCommand = (highlightedCommand - 1 + commands.length) % commands.length;
                updateCommandClass(highlightedCommand);
            } else if (event.key === 'Enter') {
                if (highlightedCommand >= 0 && highlightedCommand < commands.length) {
                    commands[highlightedCommand].click();
                }
            }
        }
        document.addEventListener('keydown', handleKeyDown);
        function handleMouseOver(event) {
            commands.forEach(child => {
            child.classList.remove('command');
            });
            event.target.classList.add('command');
            var highlightedCommand = parseInt(event.target.id)
        }
        commands.forEach(
            child => {
            child.addEventListener('mouseover', handleMouseOver);
            }
        );
        }
    }

async function start() {
    if (pID == null){
        await setup()
    }
    else{
        await setup(true)
        await loadEntry(pID)
    }
}

if (document.getElementById("pathToGenerator") == null){
start()}