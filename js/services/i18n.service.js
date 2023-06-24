// 'use strict'

const gTrans = {
    title: {
        en: 'Memes',
        he: 'מימים',
    },
    gallery: {
        en: 'Gallery',
        he: 'גלריה',
    },
    saved: {
        en: 'Saved',
        he: 'שמורים',
    },
    about: {
        en: 'About',
        he: 'אודות',
    },
    'enter-text': {
        en: 'Write your text!',
        he: 'כתוב משהו!',
    },
    download: {
        en: 'Download',
        he: 'הורדה',
    },
    share: {
        en: 'Share',
        he: 'שיתוף',
    }
}

let = gCurrLang = 'en'

function setLang(lang) {
    gCurrLang = lang
  }

  function doTrans() {
    const els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
      const transKey = el.dataset.trans
      const transTxt = getTrans(transKey)
      if (el.placeholder) el.placeholder = transTxt
      else el.innerText = transTxt
    })
  }

  function getTrans(transKey) {
    let transMap = gTrans[transKey]
    if (!transMap) return 'UNKNOWN'
    let transTxt = transMap[gCurrLang]
    if (!transTxt) transTxt = transMap.en
    return transTxt
  }