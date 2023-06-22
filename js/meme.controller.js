let gElCanvas
let gCtx
const STORAGE_KEY = 'gMeme'
const gSavedMemes = []



function onInit() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')
  renderGallery()
  renderSavedMeme()
  renderMeme()
}

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
    renderLines()
    renderFrame()
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


function onClearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}


//CLICK
function onCanvasClick({ offsetX, offsetY }) {

  if (isTextClicked({ offsetX, offsetY })) {
    onSwitchLine()
  }
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
}

function onSaveMeme() {
  gSavedMemes.push(JSON.parse(JSON.stringify(gMeme)))
  console.log('gSavedMemes', gSavedMemes)
  saveToStorage(STORAGE_KEY, gSavedMemes)
}

function renderSavedMeme() {
//   let memes = loadFromStorage(STORAGE_KEY)

//   var strHTMLs = memes.map(meme => {
//     console.log('meme', meme)
//     return `<img data-id="${meme.selectedImgId}"
//      onclick="onImgSelect(this.dataset.id)" src="/images/${meme.selectedImgId}.jpg">`
// })

// document.querySelector('.saved-memes .main-screen').innerHTML = strHTMLs.join('') 
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

// Upload the image to a server, get back a URL 
// call the function onSuccess when done
function doUploadImg(imgDataUrl, onSuccess) {
  // Pack the image for delivery
  const formData = new FormData()
  formData.append('img', imgDataUrl)

  // Send a post req with the image to the server
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



