const parentDiv = document.getElementById("commands")
const delay = ms => new Promise(res => setTimeout(res, ms));
highlightedCommand = 0

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
}
commands.forEach(child => {
    child.addEventListener('mouseover', handleMouseOver);
});

async function addEntries(){
    const entries = await getJson("../reviews/entries.json")
    for (let x of entries["music"]){
        let entry = document.createElement("a")
        entry.textContent = `> ${x["name"]} - ${x["date"]}`
        entry.style.display = "none"
        parentDiv.appendChild(entry)

    }
}

addEntries()
async function delayLoad(){
    for (let x of parentDiv.children){
        x.style.display = "block"
        await delay(120)
    }
}
delayLoad()

const commands = Array.from(parentDiv.children)