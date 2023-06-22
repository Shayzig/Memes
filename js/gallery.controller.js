function onGallery () {
    document.querySelector('.main-content').style.display = 'none'
    document.querySelector('.saved-memes').style.display = 'none'
    document.querySelector('.img-gallery').style.display = 'flex'
    document.querySelector('body').style.background = 'none'
    document.querySelector('body').style.backgroundColor = '#22252c'
}

function renderGallery() {
    let imgs = getImgs()
    
    var strHTMLs = imgs.map(img => {
        return `<img data-id="${img.id}" onclick="onImgSelect(this.dataset.id)" src="/${img.url}">`
    })

    const elGallery = document.querySelector('.img-gallery .main-screen').innerHTML = strHTMLs.join('')
}

function onImgSelect(imgId) {
 setImageFromGallery(imgId)
}