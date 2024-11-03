function readText(path){
    fetch(path)
    .then(response => response.text())
    .then(text => grabbed = text)
    return grabbed
}