let gMeme = {
    selectedImgId: 10,
    selectedLineIdx: 0,
    notSelectedLineIdx: 1,
    lines:
        [
            {
                txt: '',
                size: 40,
                color: 'red',
                x: 250,
                y: 100,


            },

            {
                txt: '',
                size: 40,
                color: 'blue',
                x: 250,
                y: 350,
            }
        ]

}

let gImgs = addImgs()
let isFirstRandom
let isFirstLineChecked = false



function getMeme() {
    return gMeme
}


// write text by user
function setLineText(userText) {
    if (gMeme.selectedLineIdx === 0) {
        gMeme.lines[0].txt = userText
    } else {
        gMeme.lines[1].txt = userText
    }
    // saveUserText(userText)
    renderMeme()
}

//set correct text value in the input
function setTextValueAfterSwitch(lineText) {
    if (lineText === 'firstLine') {
        renderTextValueAfterswitch(0)
    } else if (lineText === 'secondLine') {
        renderTextValueAfterswitch(1)
    }
}

//text-color
function setTextColor(userColor) {
    gMeme.lines[gMeme.selectedLineIdx].color = userColor
    renderMeme()
}

function getTextColor(line) {
    return gMeme.lines[line].color
}

//font-size
function setTextSize(sign) {
    if (sign === '+') {
        gMeme.lines[gMeme.selectedLineIdx].size += 5
    } else if (sign === '-') {
        gMeme.lines[gMeme.selectedLineIdx].size -= 5
    }
    renderMeme()
}

function getTextSize(line) {
    return gMeme.lines[line].size
}

// line
function addLine() {
    gMeme.selectedLineIdx = 1
    isFirstLineChecked = true
    deletePlaceHolder()
}

function setSwitchLine() {
        if (gMeme.selectedLineIdx === 0) {
            gMeme.selectedLineIdx = 1
            gMeme.notSelectedLineIdx = 0

            setTextValueAfterSwitch('secondLine')
        } else if (gMeme.selectedLineIdx === 1) {
            gMeme.selectedLineIdx = 0
            gMeme.notSelectedLineIdx = 1

            setTextValueAfterSwitch('firstLine')
        }
    
}

function getSelectedLineIdx() {
    return gMeme.selectedLineIdx
}

function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function getSelectedLineUserText() {
    return gMeme.lines[gMeme.selectedLineIdx].txt
}

// img selection from gallery
function setImageFromGallery(imgId) {
    gMeme.selectedImgId = imgId
    renderMeme()
}


function setRandomImg() {
    if (isFirstRandom) {
       renderFlexMeme()
       isFirstRandom = false
    } else {
        clearText()
        renderFlexMeme()
    }
}

function clearText () {
    gMeme.lines[gMeme.selectedLineIdx].txt = ''
}

function renderFlexMeme () {
    gMeme.selectedImgId = getRandomInt(1, 18) //15
    gMeme.selectedLineIdx = getRandomInt(0, 2) //1
    gMeme.lines[gMeme.selectedLineIdx].size = getRandomInt(21, 50)
    gMeme.lines[gMeme.selectedLineIdx].txt = makeLorem(4)
}

function isTextClicked(clickedPos) {

    let xPose = gMeme.lines[gMeme.notSelectedLineIdx].x
    let yPose = gMeme.lines[gMeme.notSelectedLineIdx].y

    const distance = Math.sqrt((xPose - clickedPos.offsetX) ** 2 + (yPose - clickedPos.offsetY) ** 2)

    return distance <= gMeme.lines[gMeme.notSelectedLineIdx].size

}


//IMG
function addImgs() {
    res = []
    for (let i = 1; i < 18; i++) {
        res.push({ id: i, url: `images/${i}.jpg`, keywords: [] })
    }
    return res
}

function getImgs() {
    return gImgs
}


//SAVE MEMES

