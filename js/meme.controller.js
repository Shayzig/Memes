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
    renderLines()
    renderFrame()
  }
  img.src = `images/${getMeme().selectedImgId}.jpg`
}

function renderLines() {
  let gMeme = getMeme()
  gMeme.lines.forEach(line => {
    drawText(line.txt,line.color, line.size, line.x, line.y)
  });
}


// TEXT
function drawText(text,color,size, x, y) {
  gCtx.lineWidth = 2
  gCtx.strokeStyle = 'brown'
  gCtx.fillStyle = color
  gCtx.font = `${size}px Arial`
  gCtx.textAlign = 'center'
  gCtx.textBaseline = 'middle'

  gCtx.fillText(text, x, y)
  gCtx.strokeText(text, x, y)
}

function changeTextColor(userColor) {
setTextColor(userColor)
}

function onChangeTextSize(sign) {
setTextSize(sign)
}

function  renderTextValueAfterswitch(line) {
   const elAddText = document.querySelector('.editor #add-text')
   elAddText.value = gMeme.lines[line].txt
}




// LINE
function onAddLine() {
addLine()
renderMeme()
renderFrame()
}

function onSwitchLine() {
setSwitchLine()
renderMeme()
renderFrame()

}

function deletePlaceHolder() {
  const elAddText = document.querySelector('.editor #add-text')
  elAddText.value = ''
}

function renderFrame() {
  let selectedLine =  getSelectedLine()
  
  drawRect(selectedLine.x, selectedLine.y)
}

function drawRect(x, y) {
  const rectWidth = 380
  const rectHeight = 80
  const rectX = x - 188
  const rectY = y - 42
  
  gCtx.strokeStyle = 'black'
  gCtx.setLineDash([5, 5])
  gCtx.strokeRect(rectX, rectY, rectWidth, rectHeight)
  gCtx.setLineDash([])
}



// DOWNLOAD
function downloadCanvas(elLink) {
  const data = gElCanvas.toDataURL()
  elLink.href = data
  elLink.download = 'My Meme'
}


function onClearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}


//CLICK
function onCanvasClick({offsetX, offsetY}) {

  if (isTextClicked({offsetX, offsetY})) {
    onSwitchLine()
  }
}