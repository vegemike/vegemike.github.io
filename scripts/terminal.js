//https://vegemike.github.io/reviews/music?name=review+of+something&id=idOfPost
params = new URLSearchParams(window.location.search);
pID = params.get('id');
var entryJSON
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
    const entries = await getJson("../reviews/entries.json")
    if (!skip){
    for (let x of entries["music"]){
        let entry = document.createElement("a")
        entry.textContent = `> ${x["name"]} - ${x["date"]}`
        entry.style.display = "none"
        entry.id = entries["music"].indexOf(x)
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




async function loadEntry(entryIndex) {
    console.log(entryJSON)
    entryJSON = entryJSON["music"]
    params.set("name", encodeURIComponent(entryJSON[entryIndex]["name"]));
    params.set("id", entryIndex);
    history.pushState(null, "", "?" + params.toString());
    parentDiv.innerHTML = ""
    document.getElementById("titley").textContent = entryJSON[entryIndex]["name"] + "  -  " + entryJSON[entryIndex]["date"]
    backButton = document.createElement("a")
    backButton.id="backButton"
    backButton.textContent = "> back"
    backButton.onclick = unloadEntry
    parentDiv.append(backButton)
    postData = await fileContents("/reviews" + entryJSON[entryIndex]["path"])
    tempString = postData.split("%")
    header = tempString[0]
    tempString = tempString[1]
    tempString = tempString.split("&")
    subheader = tempString[0]
    content = tempString[1].split("(;)")
    delete tempString
    textBox = document.getElementById("textHere")
    titlebit = document.createElement("h1")
    titlebit.textContent = header
    textBox.appendChild(titlebit)
    titlebit = document.createElement("h2")
    titlebit.textContent = subheader
    textBox.appendChild(titlebit)
    textBox.appendChild(document.createElement("hr"))
    for (x of content){
        textbit = document.createElement("p")
        textBox.appendChild(textbit)
        for (i of x.split(" ")){
            if (i.includes('<IMG="')){
                imageElement = document.createElement("img")
                source = i.replace('<IMG="', "")
                console.log(source)
                source = source.replace('">', "")
                imageElement.src = "../" + source
                textBox.appendChild(imageElement)
                textbit = document.createElement("p")
                textBox.appendChild(textbit)
            }
            else {
                textbit.textContent += i + " "
                //await delay(30)
            }
        }
        textBox.appendChild(document.createElement("hr"))
        textBox.appendChild(document.createElement("br"))
    }
    // also ,make the mouse change highlightedCommand
}

async function unloadEntry() {
    //restore style.display.block to all the commands and delete all children of #textHere as well as the button itself
    history.replaceState(null, "", window.location.pathname);
    document.getElementById("textHere").innerHTML = ""
    document.getElementById("titley").textContent = "Music Reviews"
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