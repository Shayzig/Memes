let gElCanvas
let gCtx

let gStartPos
// let gEmojiStartPos
// let gIsEmojiActive = false
// let gUserEmoji = ''
let isEmojiLastChar = false


let isFirstEdit = true
let isEditMode = false




const STORAGE_KEY = 'gMeme'
const gSavedMemes = []



function onInit() {
  let memes = loadFromStorage(STORAGE_KEY)

  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')
  resizeCanvas()
  renderMeme()
  addMouseListeners()
}


//DRAG & DROP
function addMouseListeners() {
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mouseup', onUp)
  gElCanvas.addEventListener('keydown', keyDown)
}

function keyDown(event) {
  let memeText = getMeme().lines[gMeme.selectedLineIdx].txt
  let cursorPos = memeText.length

  if (event.key === 'Backspace' && isEmojiLastChar) {
    memeText = memeText.substring(0, cursorPos - 2)
  }
  if (isFirstEdit && event.key === 'Backspace') {
    memeText = ''
    gMeme.lines[gMeme.selectedLineIdx].txt = memeText

  } else if (event.key === 'Backspace') {
    memeText = memeText.substring(0, cursorPos - 1)
    gMeme.lines[gMeme.selectedLineIdx].txt = memeText

  } else if (event.key.length === 1) {
    memeText += event.key
    gMeme.lines[gMeme.selectedLineIdx].txt = memeText
    isFirstEdit = false
    isEmojiLastChar = false
  }

  renderMeme()
}

function onDown(ev) {
  const pos = getEvPos(ev)
  //LINE
  if (isLineClicked(pos)) {
    isEditMode = true
    renderMeme()
    setLineDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
  } else return
}


function onMove(ev) {
  const hoverPos = getEvPos(ev)
  const pos = getEvPos(ev)

  let isDrag = getDragingSit()

  document.body.style.cursor = isLineClicked(hoverPos) ? 'grabbing' : 'grab'

  if (isDrag) {
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y

    moveLine(dx, dy)

    gStartPos = pos

    renderMeme()
  }
}


function onUp() {
  setLineDrag(false)
  setEmojiDrag(false)
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

  var img = new Image();
  img.onload = function () {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

    if (isEditMode) {
      renderFrame()
    }
    renderLines()
  }
  img.src = `images/${getMeme().selectedImgId}.jpg`;
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
  gCtx.strokeStyle = 'black'
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

function onAddText(userText) {
  if (gMeme.selectedLineIdx === 0) {
    gMeme.lines[0].txt = userText
  } else {
    gMeme.lines[1].txt = userText
  }
  isFirstEdit = false
  isEmojiLastChar = false
  console.log('isEmojiLastChar', isEmojiLastChar)
  renderMeme()
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
  const text = getMeme().lines[gMeme.selectedLineIdx].txt;
  const textWidth = gCtx.measureText(text).width;
  const textHeight = parseInt(gCtx.font);

  const rectX = x - rectWidth / 2;
  const rectY = y - rectHeight / 2;

  gCtx.strokeStyle = 'transparent';
  gCtx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  gCtx.setLineDash([5, 5]);
  gCtx.fillRect(rectX, rectY, rectWidth, rectHeight);
  gCtx.strokeRect(rectX, rectY, rectWidth, rectHeight);
  gCtx.setLineDash([]);

  const cubeSize = 10;
  const cubeOffset = cubeSize * 1.2;

  // Top cube
  gCtx.fillStyle = 'black';
  gCtx.fillRect(rectX + rectWidth / 2 - cubeSize / 2, rectY - cubeOffset, cubeSize, cubeSize);

  // Right cube
  gCtx.fillRect(rectX + rectWidth + cubeOffset, rectY + rectHeight / 2 - cubeSize / 2, cubeSize, cubeSize);

  // Bottom cube
  gCtx.fillRect(rectX + rectWidth / 2 - cubeSize / 2, rectY + rectHeight + cubeOffset, cubeSize, cubeSize);

  // Left cube
  gCtx.fillRect(rectX - cubeOffset, rectY + rectHeight / 2 - cubeSize / 2, cubeSize, cubeSize);

  // Additional cube at the top
  gCtx.fillRect(rectX + rectWidth / 2 - cubeSize / 2, rectY - cubeOffset - cubeOffset, cubeSize, cubeSize);

  // Connecting line
  gCtx.beginPath();
  gCtx.moveTo(rectX + rectWidth / 2, rectY - cubeOffset);
  gCtx.lineTo(rectX + rectWidth / 2, rectY - cubeOffset - cubeOffset);
  gCtx.stroke();
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
  let memes = loadFromStorage('gMeme')
  setSavedMeme(src, memes)
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
      ('Got back live url:', url)
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


//EMOJI

function onRenderEmoji(userEmoji) {
  gMeme.lines[gMeme.selectedLineIdx].txt += userEmoji
  isFirstEdit = false
  isEmojiLastChar = true
  isEditMode = true
  document.addEventListener('keydown', keyDown)
  renderMeme()
}









