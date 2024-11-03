const parentDiv = document.getElementById("commands")
const commands = Array.from(parentDiv.children)
highlightedCommand = 0

function updateCommandClass(index) {
    children.forEach(child => {
        child.classList.remove('command');
    });
    if (index >= 0 && index < children.length) {
        children[index].classList.add('command');
    }
}

function handleKeyDown(event) {
    if (event.key === 'ArrowDown') {
        // Move down
        highlightedCommand = (highlightedCommand + 1) % children.length; 
        updateCommandClass(highlightedCommand);
    } else if (event.key === 'ArrowUp') {
        // Move up
        highlightedCommand = (highlightedCommand - 1 + children.length) % children.length; 
        updateCommandClass(highlightedCommand);
    } else if (event.key === 'Enter') {
        if (highlightedCommand >= 0 && highlightedCommand < children.length) {
            children[highlightedCommand].click();
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