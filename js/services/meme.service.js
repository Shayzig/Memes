
let gMeme = {
    selectedImgId: 10,
    selectedLineIdx: 0,
    lines:
        [
            {
                txt: 'Write your text!',
                size: 40,
                color: 'white',
                x: 350,
                y: 100,
                isDrag: false,
                isEditing: false,
                font:'arial'


            },

            {
                txt: '',
                size: 40,
                color: 'white',
                x: 350,
                y: 350,
                isDrag: false,
                isEditing: false,
                font:'arial'
            }
        ]

}

let gFilterBy = ''

let isFirstRandom
let isFirstLineChecked = false

let gIconIdx = 0
let gIcons = ['😀', '🎈', '✨', '🕶', '🎩', '🎵', '💰', '🌌', '❄', '🔥', '🌠', '🍕', '🍺', '🤣', '😍', '🤑', '😢', '☠', '🐾', '🐢', '🐍']


let gImgs = addImgs()
addKeyWords()





function getIcons() {
    var iconIdx = gIconIdx
    var icons = [gIcons[gIconIdx]]
    for (var i = 0; i < 4; i++) {
        iconIdx++

        if (iconIdx >= gIcons.length) iconIdx = 0
        icons[i + 1] = gIcons[iconIdx]
    }



    //  gIcons.slice(gIconIdx, gIconIdx+5)
    return icons
}



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


//drag and drop
function isLineClicked(clickedPos) {
    let xPos = gMeme.lines[gMeme.selectedLineIdx].x
    let yPos = gMeme.lines[gMeme.selectedLineIdx].y
    let lineSize = gMeme.lines[gMeme.selectedLineIdx].size
    // Calc the distance between two dots
    const distance = Math.sqrt((xPos - clickedPos.x) ** 2 + (yPos - clickedPos.y) ** 2)
    // console.log('distance', distance)
    //If its smaller then the radius of the circle we are inside
    return distance <= lineSize
}

function setLineDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
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
    if (signOperator === '+' && gMeme.lines[gMeme.selectedLineIdx].size < 60) {
        gMeme.lines[gMeme.selectedLineIdx].size += 5
    } else if (signOperator === '-' && gMeme.lines[gMeme.selectedLineIdx].size > 30) {
        gMeme.lines[gMeme.selectedLineIdx].size -= 5
    }
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
        renderTextValueAfterswitch(0)
        
    } else if (gMeme.selectedLineIdx === 1) {
        gMeme.selectedLineIdx = 0
        renderTextValueAfterswitch(1)
        
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

function setCarouselIdx(iconIdx) {
    gIconIdx += iconIdx
    if (gIconIdx >= gIcons.length) gIconIdx = 0
    if (gIconIdx < 0) gIconIdx = gIcons.length - 1
}

//fonts
function setFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font.toLowerCase()
    console.log(gMeme.lines[gMeme.selectedLineIdx].font)
}

