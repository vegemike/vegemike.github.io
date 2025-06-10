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

function sanitizeHtmlFilename(inputStr) {
    let filename = inputStr.toLowerCase();
    if (filename.split(" ").length > 6){
        filename = filename.split(" ").slice(0, 6).join(" ")
    }
    filename = filename.replace(/[^a-z0-9._-]/g, '-');
    filename = filename.replace(/-+/g, '-').replace(/^-+|-+$/g, '');

    return filename;
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
    //domain = {"music projects":["music", "/projects"], "Music Reviews":["music","/reviews"], "techy projects":["tech", "/projects"],"TV/film reviews":["tv","/reviews"]}[toptitlething]
    coding = false
    console.log(entryJSON)
    dir1 = subCategory
    entryJSON = entryJSON[category];
    
    postData = await fileContents("/" + dir1 + entryJSON[entryIndex]["path"])
    tempString = postData.split("%")
    header = tempString[0]
    
    if (document.getElementById("pathToGenerator") == null){
        htmlheader = sanitizeHtmlFilename(header)
        temp2 = entryJSON[entryIndex]["path"].split("/")[1]
        newOne = {"t":"main/tech/", "m":"main/music/", "r":"other/tv/", "mi":"other/misc/"}[temp2]
        newrl = `../../${newOne}`
        window.location.replace(newrl + htmlheader)
    }
    
    params.set("name", encodeURI(entryJSON[entryIndex]["name"].replace(/ /g, "-")));
    params.set("id", entryIndex);
    history.pushState(null, "", "?" + params.toString());
    document.getElementById("titley").textContent = entryJSON[entryIndex]["name"] + "  -  " + entryJSON[entryIndex]["date"]
    backButton = document.createElement("a")
    backButton.id="backButton"
    backButton.textContent = "> back"
    backButton.onclick = unloadEntry
    parentDiv.innerHTML = ""
    parentDiv.append(backButton)
    
    if (subCategory == "all") {
        storedPath = entryJSON[entryIndex]["path"]
        lowestFolder = storedPath.split("/")[1]
        dir1 = {"mi":"other", "r":"other", "t":"main", "m":"main"}[lowestFolder]
    }
    if (document.getElementById("pathToGenerator") != null){
    tempString = tempString.slice(1).join("%")
    tempString = tempString.split("&")
    console.log(tempString)
    subheader = tempString[0]
    content = tempString.slice(1).join("&")
    content = content.split("(;)")
    delete tempString
    textBox = document.getElementById("textHere")
    titlebit = document.createElement("h1")
    titlebit.textContent = header
    textBox.appendChild(titlebit)
    titlebit = document.createElement("h2")
    titlebit.textContent = subheader
    contentsTitle = document.createElement("h5")
    contentsTitle.textContent = "contents (loading):"
    contentsTitle.style.marginBottom = "5px"
    contentsDiv = document.createElement("div")
    contentsDiv.id = "contentsDiv"
    titlebit.append(contentsTitle)
    titlebit.append(contentsDiv)
    textBox.appendChild(titlebit)
    textBox.appendChild(document.createElement("hr"))

    rule = document.createElement("hr")
    rule.id = "commandRule"
    document.getElementById("commands").appendChild(rule)
        console.log("loading doc")
        for (x of content){
            //x = x.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + " ";
            textbit = document.createElement("p")
            textBox.appendChild(textbit)
            for (i of x.split(" ")){
                if (!(document.getElementById("titley").textContent == toptitlething)){
                    if (i.includes("'''")){
                        
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
                    else if (i.includes("''")){
                        
                        if (!coding){
                            textbit.style.display = "inline"
                            textbit.textContent += "  "
                            codeBit = document.createElement("code")
                            codeBit.style.display = "inline"
                            textBox.appendChild(codeBit)
                        }
                        else {
                            textbit = document.createElement("p")
                            textbit.style.display = "inline"
                            textbit.textContent += "  "
                            textBox.appendChild(textbit)
                        }
                        coding = !coding
                    } 
                    else if (coding){
                        
                        codeBit.textContent += i + " "
                        await delay(5)
                    }
                    else if (i.includes('<IMG="')){
                        imageElement = document.createElement("img")
                        source = i.replace('<IMG="', "")
                        console.log(source)
                        source = source.replace('">', "")
                        imageElement.src = "../../../" + source
                        textBox.appendChild(imageElement)
                        textbit = document.createElement("p")
                        textBox.appendChild(textbit)
                    }
                    else if (i.includes('<VID="')){
                        vidElement = document.createElement("video")
                        source = i.replace('<VID="', "")
                        console.log(source)
                        source = source.replace('">', "")
                        vidElement.src = "../../../" + source
                        vidElement.controls = true;
                        textBox.appendChild(vidElement)
                        textbit = document.createElement("p")
                        textBox.appendChild(textbit)
                    }
                    else if (i.includes('<AUD="')){
                        audElement = document.createElement("audio")
                        source = i.replace('<AUD="', "")
                        console.log(source)
                        source = source.replace('">', "")
                        audElement.src = "../../../" + source
                        audElement.controls = true
                        textBox.appendChild(audElement)
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
                        imageElement = document.createElement("h3")
                        texthead = i.replace('(**', "")
                        texthead = texthead.replace('**)', "")
                        imageElement.id = texthead
                        contentsP = document.createElement("p")
                        contentsP.dataset.targetid = texthead
                        texthead = texthead.replace(/_/g, " ")
                        contentsP.textContent = "- "+ texthead
                        contentsP.onclick = scrollToContent
                        contentsDiv.appendChild(contentsP)
                        imageElement.textContent = texthead
                        imageElement.style.textDecoration = "underline"
                        textBox.appendChild(imageElement)
                        textbit = document.createElement("p")
                        textBox.appendChild(textbit)
                    }
                    
                    else if (isAValidURL(i.substring(2)) && i.startsWith("a:")){
                        anchor = document.createElement("a")
                        anchor.href = i.substring(2)
                        anchor.classList.add("docLink")
                        anchor.textContent = i.substring(2)
                        textBox.appendChild(anchor)
                        textbit = document.createElement("p")
                        textBox.appendChild(textbit)
                    }
                    else {
                        textbit.textContent += i + " "
                        await delay(2)
                    }
            }
            else {
                return ""
            }
        }
            
            textBox.appendChild(document.createElement("hr"))
            textBox.appendChild(document.createElement("br"))
        }}
    // also ,make the mouse change highlightedCommand
    //cant be bothered actually maybe in a few weeks
    contentsTitle.textContent = "contents:"
}
window.onload = async function(){

if (document.getElementById("pathToGenerator")!= null){
/*     entryJSON = await getJson("../../../entries.json")
    entryJSON = entryJSON[subCategory]
    console.log(entryJSON) */
    fileToLoad = document.getElementById("pathToGenerator").textContent
    await setup(true)
    countID = 0
    for (entry of entryJSON[category]){
        if (entry["path"].includes(fileToLoad)) {
            await loadEntry(countID)
        }
        else {
            countID += 1
        }
    }
}    
};

function isAValidURL(url) {
    const pattern = /^(https?:\/\/)?([\w-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/;
    return pattern.test(url);
}

function scrollToContent(){
    document.getElementById(this.dataset.targetid).scrollIntoView()
}