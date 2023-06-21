let gMeme = {
    selectedImgId: 10,
    selectedLineIdx: 0,
    lines:
        [
            {
                txt: '',
                size: 20,
                color: 'red'
            },

            {
                txt: '',
                size: 20,
                color: 'red'
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

function setTextValueAfterSwitch(lineText) {
    if (lineText === 'firstLine') {
        renderTextValueAfterswitch(0)
    } else if (lineText === 'secondLine') {
        renderTextValueAfterswitch(1)
    }
}

//text-color
function setTextColor(userColor) {
    gMeme.lines[0].color = userColor
    renderMeme()
}

function getTextColor() {
    return gMeme.lines[0].color
}

//font-size
function setTextSize(sign) {
    let textSize = gMeme.lines[0].size

    sign === '+' ? gMeme.lines[0].size += 5 : gMeme.lines[0].size -= 5
    if (textSize >= 40 || textSize <= 10) return
    renderMeme()
}

function getTextSize() {
    return gMeme.lines[0].size
}

// LINE
function addLine() {
    gMeme.selectedLineIdx = 1
    deletePlaceHolder()
}

function setSwitchLine() {
    if (gMeme.selectedLineIdx === 0) {
        gMeme.selectedLineIdx = 1
        setTextValueAfterSwitch('secondLine')
    } else if (gMeme.selectedLineIdx === 1) {
        gMeme.selectedLineIdx = 0
        setTextValueAfterSwitch('firstLine')
    }
}





// img selection from gallery
function setImg(imgId) {
    gMeme.selectedImgId = imgId
    renderMeme()
}
