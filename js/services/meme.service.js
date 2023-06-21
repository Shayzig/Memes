let gMeme = {
    selectedImgId: 10,
    selectedLineIdx: 0,
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

        setTextValueAfterSwitch('secondLine')
    } else if (gMeme.selectedLineIdx === 1) {
        gMeme.selectedLineIdx = 0

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
function setImg(imgId) {
    gMeme.selectedImgId = imgId
    renderMeme()
}


function isClickedText(ev) {
    console.log({ offsetX, offsetY } = ev)

    // let xPose = gMeme.lines[gMeme.selectedLineIdx].x
    // let yPose = gMeme.lines[gMeme.selectedLineIdx].y

    // console.log('xPose:',gMeme.lines[gMeme.selectedLineIdx].x, 'yPose', gMeme.lines[gMeme.selectedLineIdx].y )

    // if (offsetX >= )
}