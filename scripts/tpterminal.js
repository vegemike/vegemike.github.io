//https://vegemike.github.io/reviews/tech?name=review+of+something&id=idOfPost
params = new URLSearchParams(window.location.search);
pID = params.get('id');
var entryJSON
var toptitlething = "techy projects"
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
    const entries = await getJson("../projects/entries.json")
    if (!skip){
    for (let x of entries["tech"]){
        let entry = document.createElement("a")
        entry.textContent = `> ${x["name"]} - ${x["date"]}`
        entry.style.display = "none"
        entry.id = entries["tech"].indexOf(x)
        entry.classList.add("entry")
        parentDiv.appendChild(entry)

    }}
    console.log("finished generation")
    return entries
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
    history.replaceState(null, "", window.location.pathname);
    document.getElementById("textHere").innerHTML = ""
    document.getElementById("titley").textContent = "techy projects"
    setup()
}





async function setup(skipEntries = false) {
    parentDiv.innerHTML = '<a href="../index" class="command">> back</a>'
    entryJSON = await addEntries(skipEntries)
    console.log(entryJSON)
    if (!skipEntries){
        await delayLoad()
        entriesList = document.querySelectorAll(".entry");
        var commands = Array.from(parentDiv.children)
        entriesList.forEach(element => {
            element.addEventListener("click", function() {
                loadEntry(this.id); 
            });});
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
                // Move down
                highlightedCommand = (highlightedCommand + 1) % commands.length; 
                updateCommandClass(highlightedCommand);
            } else if (event.key === 'ArrowUp') {
                // Move up
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
        commands.forEach(child => {
            child.addEventListener('mouseover', handleMouseOver);
    });}
}

async function start() {
    
if (pID == null){
    setup()
}
else {
    await setup(true)
    await loadEntry(pID)
}}

start()