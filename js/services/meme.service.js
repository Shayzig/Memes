let gMeme = {
    selectedImgId: 10,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'red'
        }]
}


function getMeme() {
    return gMeme
}


// write text by user
function setLineText(userText) {
    gMeme.lines[0].txt = userText
    renderMeme()
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

    sign === '+' ?  gMeme.lines[0].size+= 5 :  gMeme.lines[0].size-=5  
    if (textSize >= 40 || textSize <= 10) return
    renderMeme()
}

function getTextSize() {
    return gMeme.lines[0].size
}




// img selection from gallery
function setImg (imgId) {
    gMeme.selectedImgId = imgId
    renderMeme()
}
