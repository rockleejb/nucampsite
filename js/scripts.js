console.log('javascript connected!');
    
const carousel = new bootstrap.Carousel('#homeCarousel', {
    interval: 2000,
    pause: false
})

// when the pause button is clicked, pause the carousel
const carouselPause = document.getElementById('carouselPause');
carouselPause.addEventListener('click', function() {
    console.log('pausing the carousel');
    carousel.pause();
})

// when the play button is clicked, begin cycling through the images
const carouselPlay = document.getElementById('carouselPlay');
carouselPlay.addEventListener('click', function() {
    console.log('cycle the carousel');
    carousel.cycle();
})