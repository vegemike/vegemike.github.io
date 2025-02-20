import sys, re
#converts .mike docs into blank html (for metadata etc)
print("running")
path = sys.argv[1]
#path = "\\complexPython.mike"

def sanitiser(input_str):
    filename = input_str.lower()
    filename = re.sub(r'[^a-z0-9._-]', '-', filename)
    filename = re.sub(r'-+', '-', filename).strip('-')
    return filename

if True:
#try:
    with open(path, "r") as f:
        fileContent = f.read()
        print(path)
    fileContent = fileContent.split("%")
    title = fileContent[0]
    img = "https://vegemike.github.io/assets/reviews/music/misc/Sakamoto.webp"
    imgFound = False
    #get desc
    desc = []
    ignore = True
    blacklist = ["(;)", "(**", "<IMG=", "**)", "'''", "\\n", "<AUD="]
    ampersanded = False
    for i in fileContent[1].split(" "):
        if not ignore and not any([x in i for x in blacklist]) and len(desc) < 45:
            desc.append(i)
        if "&" in i and not ampersanded:
            ignore = False
        if len(desc) > 45 and imgFound:
            break
        if "<IMG=" in i:
            img = "https://vegemike.github.io/" + i.replace("<IMG=", "").replace(">", "").replace('"', "")
            imgFound = True

    desc = " ".join(desc).replace("\n", "").replace('"', "'")
    'for filename'
    titlelength = len(title.split(" "))
    if titlelength > 6:
        titlelength = 6
    dashedtitle = " ".join(title.split(" ")[:titlelength]).replace(" ", "-")

    'for link'
    sub = ""
    while sub not in ["music", "tech", "tv", "misc"]:
        sub = input("subcategory (music, tech, tv, misc): ")
    main = "main" if sub in ["music", "tech"] else "other"
    url = f"https://vegemike.github.io/{main}/{sub}/{sanitiser(dashedtitle)}"
    
    titlesect = {"music":"music stuff", "tech":"techy projects", "tv":"TV/film stuff", "misc":"misc"}[sub]


    HTMLcontent = f"""
    <!DOCTYPE html>
    <!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
    <!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
    <!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
    <!--[if gt IE 8]>      <html class="no-js"> <![endif]-->
    <html>
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>{title} - vegemike.github.io</title>
            <meta name="description" content="{desc}">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta property="og:title" content="{title}">
            <meta property="og:description" content="{desc}">
            <meta property="og:image" content="{img}">
            <meta property="og:url" content="{url}">
            <meta property="og:type" content="article">
            <link rel="stylesheet" href="../../styles/reviews/terminal.css">
        </head>
        <body>
            <div id="everything" style="position: absolute; left: -999999px;opacity:1%;">{fileContent}</div>
            <div class="terminal">
                <div class="header">
                    <p>mOS VERSION 311.24.2.71828</p>
                    <!--<p>COPYRIGHT 2024 KBPRecords</p>-->
                    <p>Server 8</p>
                    <p>mouse-over or use up/down and enter</p>
                    <p id="titley">{titlesect}</p>
                </div>
                <div class="content" id="commands">
                </div>
                <div id="textHere">
                </div>
                <div class="footer">
                    <p>thanks for visiting</p>
                </div>
            </div>
            <!--[if lt IE 7]>
                <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
            <![endif]-->
            
            <script src="../../scripts/parser.js" defer></script>
            <script src="../../scripts/terminal.js" defer></script>
        </body>
    </html>
    """
    print(sanitiser(dashedtitle))
    with open(f"{sanitiser(dashedtitle)}.html", "w") as f:
        f.write(HTMLcontent)


#except Exception as e:
#    print(e)
#    input()

