
let gMeme = {
    selectedImgId: 10,
    selectedLineIdx: 0,
    notSelectedLineIdx: 1,
    lines:
        [
            {
                txt: 'Write your text!',
                size: 30,
                color: 'red',
                x: 250,
                y: 100,
                isDrag: false,
                isEditing: false


            },

            {
                txt: '',
                size: 40,
                color: 'blue',
                x: 250,
                y: 350,
                isDrag: false,
                isEditing: false
            }
        ]

}



let gEmoji = {
    size: 50,
    x: 250,
    y: 250,
    isDrag: false,
    isActive: false
}



let gFilterBy = ''

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
    const line = gMeme.lines[gMeme.selectedLineIdx]
  
    gCtx.font = `${line.size}px Arial`;
    const textWidth = gCtx.measureText(line.txt).width
    const textHeight = line.size;
  
    const rectX = line.x - textWidth / 2
    const rectY = line.y - textHeight / 2
  
    return (
      clickedPos.x >= rectX &&
      clickedPos.x <= rectX + textWidth &&
      clickedPos.y >= rectY &&
      clickedPos.y <= rectY + textHeight
    )
}
  
function setLineDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function setEmojiDrag(isDrag) {
    gEmoji.isDrag = isDrag
}

function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].x += dx
    gMeme.lines[gMeme.selectedLineIdx].y += dy
}

function getDragingSit() {
    return gMeme.lines[gMeme.selectedLineIdx].isDrag
}


function getMeme() {
    return gMeme
}

function getGemoji() {
    return gEmoji
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
function setTextSize(signOperator) {
    if (signOperator === '+' && gMeme.lines[gMeme.selectedLineIdx].size < 50) {
        gMeme.lines[gMeme.selectedLineIdx].size += 5
    } else if (signOperator === '-' && gMeme.lines[gMeme.selectedLineIdx].size > 20) {
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
    var imgs = gImgs.filter(img =>
        (img.keywords.join(',').includes(gFilterBy.toLowerCase()))
    )
    return imgs
}

//SAVE MEMES
function setSavedMeme(src, savedMemes) {
    const userMeme = savedMemes.find(meme => meme.imgUrl === src)
  
    userMeme.lines.forEach((line, index) => {
      const { txt, size, color, x, y } = line
      gMeme.lines[index] = { txt, size, color, x, y }
    })
  
    gMeme.selectedImgId = userMeme.selectedImgId
    renderMeme()
}
  
//FILTER 

function setFilterBy(filterBy) {
    gFilterBy = filterBy
}

//EMOJI
function changeEmojiSize(sizeOperator) {
    if (sizeOperator === '+' && gEmoji.size < 350) {
        gEmoji.size += 5
    } else if (sizeOperator === '-' && gEmoji.size > 20) {
        gEmoji.size -= 5
    }
}


function setLineEdit(isEdit) {
    gMeme.lines[gMeme.selectedLineIdx].isEdit = isEdit
}

function getMemePose () {
    let res = {}
    res.x = gMeme.lines[gMeme.selectedLineIdx].x
    res.y = gMeme.lines[gMeme.selectedLineIdx].y
    return res
}