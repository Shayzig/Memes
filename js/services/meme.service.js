let gMeme = {
    selectedImgId: 10,
    selectedLineIdx: 0,
    lines:
        [
            {
                txt: '',
                size: 40,
                color: 'red'
            },

            {
                txt: '',
                size: 40,
                color: 'blue'
            }
        ]

}


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
    console.log('gMeme', gMeme)
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
    deletePlaceHolder()
}

function setSwitchLine() {
    if (gMeme.selectedLineIdx === 0) {
        gMeme.selectedLineIdx = 1
        console.log('selectedLineIdx', gMeme.selectedLineIdx)

        setTextValueAfterSwitch('secondLine')
    } else if (gMeme.selectedLineIdx === 1) {
        gMeme.selectedLineIdx = 0
        console.log('selectedLineIdx', gMeme.selectedLineIdx)

        setTextValueAfterSwitch('firstLine')
    }
}





// img selection from gallery
function setImg(imgId) {
    gMeme.selectedImgId = imgId
    renderMeme()
}
