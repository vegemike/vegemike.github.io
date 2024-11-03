const parentDiv = document.getElementById("commands")
var commands = Array.from(parentDiv.children)
const delay = ms => new Promise(res => setTimeout(res, ms));
highlightedCommand = 0
async function addEntries(){
    console.log("generating anchors from JSON")
    const entries = await getJson("../reviews/entries.json")
    for (let x of entries["music"]){
        let entry = document.createElement("a")
        entry.textContent = `> ${x["name"]} - ${x["date"]}`
        entry.style.display = "none"
        entry.id = entries["music"].indexOf(x)
        parentDiv.appendChild(entry)

    }
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






async function loadEntry(entryIndex) {
    for (x of parentDiv.children){
        x.style.display = "none"
    }
    document.getElementById("titley").textContent = entryJSON[entryIndex]["name"] + entryJSON[entryIndex]["date"]
    backButton = document.createElement("a")
    backButton.id="backButton"
    backButton.textContent = "> back"
    backButton.onclick = unloadEntry
    parentDiv.append(backButton)
    // add text to #textHere :) (stagger words?)
}

async function unloadEntry() {
    //restore style.display.block to all the commands and delete all children of #textHere
}

async function setup() {
    var entryJSON = await addEntries()
    await delayLoad()
    var commands = Array.from(parentDiv.children)
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
        highlightedCommand = parseInt(event.target.id)
    }
    commands.forEach(child => {
        child.addEventListener('mouseover', handleMouseOver);
    });
}


setup()