
document.addEventListener("DOMContentLoaded", () => {
    const commandElement = document.querySelector('.command');
    const cursorElement = document.createElement('span');
    cursorElement.classList.add('cursor');
    commandElement.appendChild(cursorElement);

    // Example typing animation
    const message = "> Disengage Lock";
    let index = 0;
    const typingSpeed = 100;

    function typeText() {
        if (index < message.length) {
            commandElement.textContent += message.charAt(index);
            index++;
            setTimeout(typeText, typingSpeed);
        } else {
            commandElement.appendChild(cursorElement);
        }
    }

    typeText();
});

