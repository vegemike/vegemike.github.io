const parentDiv = document.getElementById("commands")
const commands = Array.from(parentDiv.children)
highlightedCommand = 0

function handleMouseOver(event) {
    commands.forEach(child => {
        child.classList.remove('command');
    });
    event.target.classList.add('command');
}
commands.forEach(child => {
    child.addEventListener('mouseover', handleMouseOver);
});