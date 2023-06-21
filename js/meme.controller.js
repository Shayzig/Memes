let gElCanvas
let gCtx


function onInit() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')
  renderGallery()
  renderMeme()
}

function onMemes() {
  document.querySelector('.main-content').style.display = 'flex'
  document.querySelector('.img-gallery').style.display = 'none'
}

function renderMeme() {

  onMemes()

  var img = new Image()
  img.onload = function () {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    drawText(getMeme().lines[0].txt, 210, 50)
    drawText(getMeme().lines[1].txt, 210, 400)
  }
  img.src = `images/${getMeme().selectedImgId}.jpg`
}


// TEXT
function drawText(text, x, y) {
  gCtx.lineWidth = 2
  gCtx.strokeStyle = 'brown'
  gCtx.fillStyle = getTextColor()
  gCtx.font = `${getTextSize()}px Arial`
  gCtx.textAlign = 'center'
  gCtx.textBaseline = 'middle'

  gCtx.fillText(text, x, y)
  gCtx.strokeText(text, x, y)
}

function changeTextColor(userColor) {
setTextColor(userColor)
}
function changeTextSize(sign) {
setTextSize(sign)
}
function  renderTextValueAfterswitch(line) {
  const elAddText = document.querySelector('.editor #add-text')
  elAddText.value = gMeme.lines[line].txt
}




// LINE
function onAddLine() {
addLine()
}

function onSwitchLine() {
setSwitchLine()
}

function deletePlaceHolder() {
  const elAddText = document.querySelector('.editor #add-text')
  elAddText.value = ''
}

// DOWNLOAD
function downloadCanvas(elLink) {
  const data = gElCanvas.toDataURL()
  elLink.href = data
  elLink.download = 'My Meme'
}