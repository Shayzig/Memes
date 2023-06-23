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
                isDrag: false


            },

            {
                txt: '',
                size: 40,
                color: 'blue',
                x: 250,
                y: 350,
                isDrag: false
            }
        ]

}

let gFilterBy

let gImgs = addImgs()
addKeyWords()

function addKeyWords() {
    gImgs[0].keywords.push('politicians')
    gImgs[1].keywords.push('dogs')
    gImgs[2].keywords.push('dogs')
    gImgs[3].keywords.push('cats')
    gImgs[4].keywords.push('babys')
    gImgs[5].keywords.push('funny')
    gImgs[6].keywords.push('babys')
    gImgs[7].keywords.push('babys')
    gImgs[8].keywords.push('politicians')
    gImgs[9].keywords.push('sports')
    gImgs[10].keywords.push('funnys')
}

let isFirstRandom
let isFirstLineChecked = false


//drag and drop
function isLineClicked(clickedPos) {
    let xPose = gMeme.lines[gMeme.selectedLineIdx].x
    let yPose = gMeme.lines[gMeme.selectedLineIdx].y

    // console.log('clickedPose', clickedPos)

    const distance = Math.sqrt((xPose - clickedPos.x) ** 2 + (yPose - clickedPos.y) ** 2)
    // console.log(distance)

    return distance <= gMeme.lines[gMeme.selectedLineIdx].size
}

function setLineDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
    // console.log(gMeme.lines[gMeme.selectedLineIdx].isDrag)
}

function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].x += dx
    gMeme.lines[gMeme.selectedLineIdx].y += dy
    // console.log('x',  gMeme.lines[gMeme.selectedLineIdx].x, 'y',  gMeme.lines[gMeme.selectedLineIdx].y);
}

function getDragingSit() {
    return gMeme.lines[gMeme.selectedLineIdx].isDrag
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

function deleteText() {
    gMeme.lines[gMeme.selectedLineIdx].txt = ''
    renderMeme()
    deletePlaceHolder()
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

function clearText() {
    gMeme.lines[gMeme.selectedLineIdx].txt = ''
}

function renderFlexMeme() {
    gMeme.selectedImgId = getRandomInt(1, 18) //15
    gMeme.selectedLineIdx = getRandomInt(0, 2) //1
    gMeme.lines[gMeme.selectedLineIdx].size = getRandomInt(15, 35)
    gMeme.lines[gMeme.selectedLineIdx].txt = makeLorem(3)
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
    // var imgs = gImgs.filter(img =>
    //     img.keywords[0].toLowerCase().includes(gFilterBy.toLowerCase())
    // )
}

//SAVE MEMES
function setSavedMeme(src, savedMemes) {

    console.log(savedMemes)

    var userMeme = savedMemes.find(meme => meme.imgUrl === src)

    gMeme.selectedImgId = userMeme.selectedImgId
    gMeme.lines[0].txt = userMeme.lines[0].txt
    gMeme.lines[1].txt = userMeme.lines[1].txt
    gMeme.lines[0].size = userMeme.lines[0].size
    gMeme.lines[1].size = userMeme.lines[1].size
    gMeme.lines[0].color = userMeme.lines[0].color
    gMeme.lines[1].color = userMeme.lines[1].color

    renderMeme()



}

//FILTER 

function setFilterBy(filterBy) {
    gFilterBy = filterBy
}


