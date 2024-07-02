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
        const city = await fetchCityFromIp();
        if (!city) throw new Error("Cannot determine city");
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
        const response = await fetch(url);
        const data = await response.json();
        await displayWeather(data);
    } catch (error) {
        console.error(error);
    }
}

async function displayWeather(data) {
    try {
        const imageElement = document.createElement("img");
        const iconId = data.weather[0].icon;
        imageElement.src = `https://openweathermap.org/img/w/${iconId}.png`;
        document.querySelector("#weather-icon").appendChild(imageElement);
        const tempNode = document.createTextNode(data.main.temp + "\u00B0");
        document.querySelector("#weather-temp").appendChild(tempNode);
        const description = data.weather[0].description;
        const descriptionNode = document.createTextNode(description);
        document.querySelector("#weather-description").appendChild(descriptionNode);
        const city = data.name;
        const cityNode = document.createTextNode(city);
        document.querySelector("#weather-city").appendChild(cityNode);
    } catch (error) {
        console.error(error);
    }
}

async function fetchIp() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error(error);
    }
}

async function fetchCityFromIp() {
    try {
        const ip = await fetchIp();
        const ipstackApiKey = process.env.IPSTACK_API_ACCESS_KEY;
        const options = {
            method: "GET",
        };
        const url = `https://api.ipstack.com/${ip}?access_key=${ipstackApiKey}`;
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        return data.city;
    } catch (error) {
        console.error(error);
    }
}

fetchWeather();
