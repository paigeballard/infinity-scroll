const imgContainer = document.getElementById('img-container')
const loader = document.getElementById('loader')

let ready = false 
let imagesLoaded = 0
let totalImages = 0
let photosArray = []

// unsplash api
const count = 30
const apiKey = 'taKwVRkRrhB4UdLLnhj_QWb3veUilBoDsKdfeKHhcrI'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// check if all images are loaded
function imageLoaded() {
    imagesLoaded++
    console.log(imagesLoaded)
    if (imagesLoaded === totalImages) {
        ready = true
        loader.hidden = true
        console.log('ready =', ready)
    }
}

// helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// create elements for links and photos - add to DOM
function displayPhotos() {
    imagesLoaded = 0
    totalImages = photosArray.length
    console.log('total images', totalImages)
    // run function for each object in photoArray
    photosArray.forEach((photo) => {
// create <a> to link to unsplash
        const item = document.createElement('a')
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })
// create <img> for photo
        const img = document.createElement('img')
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })

// event listner check when each is finished loading 
img.addEventListener('load', imageLoaded)

// put <img> inside <a> then out both in imageContainer element 
        item.appendChild(img)
        imgContainer.appendChild(item)
    })
}

// get photos from unsplash api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl)
        photosArray = await response.json()
        displayPhotos()
    } catch (error) {
        // catch error here
    }
}

// check to see if scrolling is near the bottom, then load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.screenY >= document.body.offsetHeight - 1000 && ready) {
        ready = false 
        getPhotos()
    }
})

// onload
getPhotos()