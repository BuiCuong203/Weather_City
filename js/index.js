const APP_ID = 'cf26e7b2c25b5acd18ed5c3e836fb235';
const DEFAULT_VALUE = '--';
const searchInput = document.querySelector('#search-input');
const cityName = document.querySelector('.city-name');
const weatherState = document.querySelector('.weather-state');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');


const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed');
const pressure = document.querySelector('.pressure');
const visibility = document.querySelector('.visibility');

const now = new Date();
const day = now.getDate();
const month = now.toLocaleString('en-US', { month: 'short' });
const year = now.getFullYear().toString().slice(-2);
const weekday = now.toLocaleString('en-US', { weekday: 'long' });
const formattedDate = `${weekday}, ${day} ${month} '${year}`;
document.querySelector('.day').textContent = formattedDate;

searchInput.addEventListener('change', (e) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${APP_ID}&units=metric&lang=vi`)
        .then(async res => {
            const data = await res.json();
            console.log('[Search Input]', data);
            cityName.innerHTML = data.name || DEFAULT_VALUE;
            weatherState.innerHTML = data.weather[0].description || DEFAULT_VALUE;
            weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            temperature.innerHTML = Math.round(data.main.temp) + '&#176;C' || DEFAULT_VALUE;

            sunrise.innerHTML = moment.unix(data.sys.sunrise).format('H:mm') || DEFAULT_VALUE;
            sunset.innerHTML = moment.unix(data.sys.sunset).format('H:mm') || DEFAULT_VALUE;
            humidity.innerHTML = data.main.humidity + '%' || DEFAULT_VALUE;
            windSpeed.innerHTML = (data.wind.speed * 3.6).toFixed(2) + 'km/h' || DEFAULT_VALUE;
            pressure.innerHTML = data.main.pressure + ' hPa' || DEFAULT_VALUE;
            visibility.innerHTML = data.visibility + 'm' || DEFAULT_VALUE;
        });
});