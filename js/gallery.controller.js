function onGallery () {
    document.querySelector('.main-content').style.display = 'none'
    document.querySelector('.img-gallery').style.display = 'flex'
}

function renderGallery() {
    const elGallery = document.querySelector('.img-gallery')
    elGallery.innerHTML = 
    `<img data-num="1" onclick="onImgSelect(this.dataset.num)" src="/images/1.jpg">
    <img data-num="2" onclick="onImgSelect(this.dataset.num)" src="/images/2.jpg">`
}

function onImgSelect(imgId) {
 setImg(imgId)
}