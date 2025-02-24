//https://vegemike.github.io/reviews/music?name=review+of+something&id=idOfPost
params = new URLSearchParams(window.location.search);
pID = params.get('id');
var entryJSON
var toptitlething = document.getElementById("titley").textContent

//set category to current folder (e.g. tv, misc etc)
splitURL = String(document.URL).split("/")
category = "all"
subCategory = "all"
//encodeURIComponent(name)
//params.set("example", "test");  set a qury value
//history.pushState(null, "", "?" + params.toString());   sets query
//history.replaceState(null, "", window.location.pathname);  clears query

const parentDiv = document.getElementById("commands")
var commands = Array.from(parentDiv.children)
const delay = ms => new Promise(res => setTimeout(res, ms));
var highlightedCommand = 0

/* function flattenAndSort(dictionary) {
    const flattenedList = Object.values(dictionary)
        .flatMap(category => Object.values(category))
        .flat();
    //del duplicates
    const uniqueList = Array.from(new Map(
        flattenedList.map(item => [JSON.stringify(item), item])
    ).values());

    const sortedList = uniqueList.sort((a, b) => {
        const [dayA, monthA, yearA] = a.date.split("/").map(Number);
        const [dayB, monthB, yearB] = b.date.split("/").map(Number);

        return yearA - yearB || monthA - monthB || dayA - dayB;
    });

    return sortedList.reverse();
} */

function processEntries(data) {
    const sectionMapping = { music: "m", tech: "t", misc: "mi", tv: "r" };
    let flattened = [];
    let seen = new Map();
    
    for (const [section, categories] of Object.entries(data)) {
        for (const [category, entries] of Object.entries(categories)) {
            for (const entry of entries) {
                const expectedPrefix = `/${sectionMapping[category]}/`;
                if (entry.path.startsWith(expectedPrefix)) {
                    if (!seen.has(entry.name)) {
                        seen.set(entry.name, { ...entry, dir: `${section}/${category}` });
                    }
                }
            }
        }
    }
    
    flattened = Array.from(seen.values());
    const sortedData = flattened.sort((a, b) => {
        const dateA = new Date(a.date.split("/").reverse().join("-"));
        const dateB = new Date(b.date.split("/").reverse().join("-"));
        return dateB - dateA;
      });
    return sortedData;
}

async function addEntries(skip = false){
    console.log("generating anchors from JSON")
    const entries = processEntries(await getJson("../../entries.json"))
    j = 0
    if (!skip){
        for (let x of entries){
            rule2 = document.createElement("hr")
            rule2.id = "cmdSep"+j
            rule2.classList.add("cmdSep")
            parentDiv.appendChild(rule2)
            let entry = document.createElement("a")
            entry.textContent = `> ${x["name"]} - ${x["dir"]}/ - ${x["date"]}`
            entry.style.display = "none"
            entry.id = j
            j++
            entry.classList.add("entry")
            entry.setAttribute("data-pathto", x["dir"])
            entry.setAttribute("data-name", x["name"])
            parentDiv.appendChild(entry)

        }
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


function getObjectByName(data, targetName) {
    return data.find(obj => obj.name === targetName) || null;
}



async function unloadEntry() {
    //restore style.display.block to all the commands and delete all children of #textHere as well as the button itself
    //done
    history.replaceState(null, "", window.location.pathname);
    document.getElementById("textHere").innerHTML = ""
    document.getElementById("titley").textContent = toptitlething
    setup()
}


async function allLoad(){
    targetObj = getObjectByName(entryJSON, this.dataset.name)
    temp2 = targetObj["path"].split("/")[1]
    newOne = {"t":"main/", "m":"main/", "r":"other/", "mi":"other/"}[temp2]
    postData = await fileContents("../"+ newOne + targetObj["path"])
    tempString = postData.split("%")
    header = tempString[0]
    htmlheader = sanitizeHtmlFilename(header)
    pathTo = this.dataset.pathto + "/"
    localStorage.setItem("fromAll", "true");
    window.location.replace("../"+pathTo+htmlheader)

}


async function setup(skipEntries = false) {
    parentDiv.innerHTML = '<a href="../../" class="command">> back</a>'
    entryJSON = await addEntries(skipEntries)
    console.log(entryJSON)
    if (!skipEntries){
        delayLoad()
        entriesList = document.querySelectorAll(".entry");
        var commands = Array.from(parentDiv.children).filter(el => el.tagName !== "HR");
        entriesList.forEach(element => {
            element.addEventListener("click", allLoad);});
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
    await setup()
}
else {
    await setup(true)
    await loadEntry(pID)
}}

start()