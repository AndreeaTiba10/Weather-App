const API_KEY = '07aed853a2b3116bf7e19dfeee63b968';

const API_URL_BASE =
  'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const todayBtn = document.querySelector('.today-btn');
const fiveDaysBtn = document.querySelector('.five-days');
export async function todayWeather(cityName) {
  try {
    const response = await fetch(`${API_URL_BASE}${cityName}&appid=${API_KEY}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    document.querySelector('.hero-weather__city').textContent = data.name;
    document.querySelector('.hero-weather__degrees').textContent =
      Math.round(data.main.temp) + '°';
    document.querySelector('.values__min h5').textContent =
      Math.round(data.main.temp_min) + '°';
    document.querySelector('.values__max h5').textContent =
      Math.round(data.main.temp_max) + '°';

    const heroWeatherIcon = document.querySelector('.hero-weather');
    const existingIcon = document.querySelector('.hero-weather__emoji');
    if (existingIcon) {
      heroWeatherIcon.removeChild(existingIcon);
    }
    let iconToday = document.createElement('img');
    iconToday.classList.add('hero-weather__emoji');
    const iconApi = data.weather[0].icon;
    const iconLink = `https://openweathermap.org/img/wn/${iconApi}@2x.png`;
    iconToday.src = iconLink;
    iconToday.alt = data.weather[0].description;
    heroWeatherIcon.prepend(iconToday);
  } catch (error) {
    console.error('There was an error fetching the weather data:', error);
  }
}

// Event listeners for buttons
todayBtn.addEventListener('click', e => {
  e.preventDefault();
  document.querySelector('.buttons').style.marginTop = '10px';
  todayBtn.style.background = 'white';
  fiveDaysBtn.style.background = 'rgba(255, 255, 255, 0.5)';
  document.querySelector('.today-weather').style.display = 'flex';
});
