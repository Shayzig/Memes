let gElCanvas
let gCtx

let gStartPos

const STORAGE_KEY = 'gMeme'
const gSavedMemes = []



function onInit() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')
  resizeCanvas()
  renderGallery()
  renderMeme()
  addMouseListeners()
}


//DRAG & DROP
function addMouseListeners() {
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mouseup', onUp)
}

function onDown(ev) {
  // Get the ev pos from mouse or touch
  const pos = getEvPos(ev)
  if (!isLineClicked(pos)) return
  // console.log('pos', pos)

  setLineDrag(true)
  // console.log(gMeme.lines)

  gStartPos = pos
  console.log('gStartPos', gStartPos)

  document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
  // console.log('Move')
  let isDrag = getDragingSit()
  if (!isDrag) return
  // console.log('drag')

  const pos = getEvPos(ev)

  const dx = pos.x - gStartPos.x
  const dy = pos.y - gStartPos.y
  // console.log('dx', dx)
  // console.log('dy', dy)

  moveLine(dx, dy)

  gStartPos = pos
  renderMeme()
}

function onUp() {
  setLineDrag(false)
  document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }
  return pos
}


//MEMES GENERAL
function onMemes() {
  document.querySelector('.main-content').style.display = 'flex'
  document.querySelector('.img-gallery').style.display = 'none'
  document.querySelector('.saved-memes').style.display = 'none'
  document.querySelector('body').style.backgroundColor = 'none'
  document.querySelector('body').style.background = 'linear-gradient(to right, #0f9bb3,#30bb73)'
}

function renderMeme() {

  onMemes()

  var img = new Image()
  img.onload = function () {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    renderFrame()
    renderLines()

  }
  img.src = `images/${getMeme().selectedImgId}.jpg`
}

function renderLines() {
  let gMeme = getMeme()
  gMeme.lines.forEach(line => {
    drawText(line.txt, line.color, line.size, line.x, line.y)
  });
}


// TEXT
function drawText(text, color, size, x, y) {
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

function renderTextValueAfterswitch(line) {
  const elAddText = document.querySelector('.editor #add-text')
  elAddText.value = gMeme.lines[line].txt
}

function onDeleteText() {
  deleteText()
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
  let selectedLine = getSelectedLine()

  drawRect(selectedLine.x, selectedLine.y)
}

function drawRect(x, y) {
  const rectWidth = 380;
  const rectHeight = 80;
  const rectX = x - 188;
  const rectY = y - 42;

  gCtx.strokeStyle = 'transparent';
  gCtx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  gCtx.setLineDash([5, 5]);
  gCtx.fillRect(rectX, rectY, rectWidth, rectHeight);
  gCtx.strokeRect(rectX, rectY, rectWidth, rectHeight);
  gCtx.setLineDash([]);
}



// DOWNLOAD
function downloadCanvas(elLink) {
  const data = gElCanvas.toDataURL()
  elLink.href = data
  elLink.download = 'My Meme'
}

//RANDOM MEME
function onRandomMeme() {
  setRandomImg()
  renderMeme()
}

//Saved

function onSaved() {
  document.querySelector('.main-content').style.display = 'none'
  document.querySelector('.img-gallery').style.display = 'none'
  document.querySelector('.saved-memes').style.display = 'block'
  document.querySelector('body').style.background = 'none'
  document.querySelector('body').style.backgroundColor = '#22252c'
  renderSavedMeme()
}

function onSaveMeme() {
  const imgDataUrl = gElCanvas.toDataURL('image/jpeg')
  gMeme.imgUrl = imgDataUrl

  gSavedMemes.push(JSON.parse(JSON.stringify(gMeme)))
  console.log('gSavedMemes', gSavedMemes)
  saveToStorage(STORAGE_KEY, gSavedMemes)
}

function renderSavedMeme() {
  let memes = loadFromStorage(STORAGE_KEY)

  var strHTMLs = memes.map(meme => {
    let img = new Image()
    img.src = meme.imgUrl

    return `<img data-id="${meme.selectedImgId}"
     onclick="onSavedMemeSelect(this.src)" src="${img.src}">`
  })

  document.querySelector('.saved-memes .main-screen').innerHTML = strHTMLs.join('')
}

function onSavedMemeSelect(src) {
  setSavedMeme(src, gSavedMemes)
}



//SHARE

function onUploadImg() {
  // Gets the image from the canvas
  const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

  function onSuccess(uploadedImgUrl) {
    // Handle some special characters
    const url = encodeURIComponent(uploadedImgUrl)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
  }

  // Send the image to the server
  doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
  const formData = new FormData()
  formData.append('img', imgDataUrl)

  const XHR = new XMLHttpRequest()
  XHR.onreadystatechange = () => {
    // If the request is not done, we have no business here yet, so return
    if (XHR.readyState !== XMLHttpRequest.DONE) return
    // if the response is not ok, show an error
    if (XHR.status !== 200) return console.error('Error uploading image')
    const { responseText: url } = XHR
    // Same as
    // const url = XHR.responseText

    // If the response is ok, call the onSuccess callback function, 
    // that will create the link to facebook using the url we got
    console.log('Got back live url:', url)
    onSuccess(url)
  }
  XHR.onerror = (req, ev) => {
    console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
  }
  XHR.open('POST', '//ca-upload.com/here/upload.php')
  XHR.send(formData)
}


//UPLOAD

function onImgInput(ev) {
  loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
  const reader = new FileReader()

  reader.onload = function (event) {
    let img = new Image()
    img.src = event.target.result
    img.onload = () => onImageReady(img)
  }
  reader.readAsDataURL(ev.target.files[0])
}

function renderImg(img) {
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}


function resizeCanvas() {
  const elContainer = document.querySelector('.my-canvas')
  gElCanvas.width = elContainer.offsetWidth
  gElCanvas.height = elContainer.offsetHeight
}

