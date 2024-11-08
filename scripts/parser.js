async function getJson(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading JSON:', error);
    }
  }

async function fileContents(url) {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Error fetching file: ${response.statusText}`);
        }
        
        const text = await response.text();
        return text;
    } catch (error) {
        console.error("Error:", error);
    }
}

async function loadEntry(entryIndex) {
    console.log("title found to be", toptitlething)
    domain = {"music projects":["music", "/projects"], "Music Reviews":["music","/reviews"], "techy projects":["tech", "/projects"],"TV/film reviews":["tv","/reviews"]}[toptitlething]
    coding = false
    console.log(entryJSON)
    entryJSON = entryJSON[domain[0]]
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
    postData = await fileContents(domain[1] + entryJSON[entryIndex]["path"])
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
            if (!(document.getElementById("titley").textContent == toptitlething)){
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
                else if (i.includes("\\n")){
                    br = document.createElement("br")
                    textBox.appendChild(br)
                    textbit = document.createElement("p")
                    textBox.appendChild(textbit)
                }
                else if (i.includes("(**")) {
                    imageElement = document.createElement("h1")
                    texthead = i.replace('(**', "")
                    texthead = texthead.replace('**)', "")
                    texthead = texthead.replace(/_/g, " ")
                    imageElement.textContent = texthead
                    textBox.appendChild(imageElement)
                    textbit = document.createElement("p")
                    textBox.appendChild(textbit)
                }
                else if (i.includes("'''")){
                    
                    if (!coding){
                        prepart = document.createElement("pre")
                        codeBit = document.createElement("code")
                        prepart.appendChild(codeBit)
                        textBox.appendChild(prepart)
                    }
                    else {
                        textbit = document.createElement("p")
                        textBox.appendChild(textbit)
                    }
                    coding = !coding
                }
                else if (coding){
                    codeBit.textContent += i + " "
                    await delay(30)
                }
                else {
                    textbit.textContent += i + " "
                    await delay(25)
                }
        }
        else {
            return ""
        }
    }

        textBox.appendChild(document.createElement("hr"))
        textBox.appendChild(document.createElement("br"))
    }
    // also ,make the mouse change highlightedCommand
    //cant be bothered actually maybe in a few weeks
}