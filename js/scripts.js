console.log('javascript connected!');

const carousel = new bootstrap.Carousel('#homeCarousel', {
    interval: 5000,
    pause: false
})

// when the pause button is clicked, pause the carousel
const carouselButton = document.getElementById('carouselButton');
const faIcon = document.getElementById('faButton');
carouselButton.addEventListener('click', function () {
    if (faIcon.classList.contains('fa-pause')) {
        faIcon.classList.remove('fa-pause');
        faIcon.classList.add('fa-play');
        carousel.pause();
    } else {
        faIcon.classList.remove('fa-play');
        faIcon.classList.add('fa-pause');
        carousel.cycle();
    }
})

async function fetchWeather() {
    try {
        const apiKey = process.env.OPEN_WEATHER_API_KEY;
        const city = "San Diego";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error(error);
    }
}

async function displayWeather(data) {
    // console.log(data);
    const imageElement = document.createElement("img");
    const iconId = data.weather[0].icon;
    imageElement.src = `https://openweathermap.org/img/w/${iconId}.png`;
    document.querySelector("#weather-icon").appendChild(imageElement);
    const tempElement = document.createTextNode(data.main.temp + "\u00B0");
    document.querySelector("#weather-temp").appendChild(tempElement);
    const description = data.weather[0].description;
    const descriptionElement = document.createTextNode(description);
    document.querySelector("#weather-description").appendChild(descriptionElement);
    const city = data.name;
    const cityElement = document.createTextNode(city);
    document.querySelector("#weather-city").appendChild(cityElement);
}

fetchWeather();
