const urlBase= `https://api.openweathermap.org/data/2.5/weather`
const API_KEY= '1e786a6652016c27f875d5eb1507d267'
const diffKelvin = 273.15
var temp = null

document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    if(city){
        fetchWeather(city)
    }else{
        alert('Ingrese una ciudad válida')
    }
})

function fetchWeather(city){
    city = city.trim()
    fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=en`)
    .then(data => data.json())
    .then(data => showWeatherData(data))
}

function showWeatherData(data){
    const divResponseData = document.getElementById('responseData')
    divResponseData.innerHTML = ''

    const cityName = data.name
    const countryName = data.sys.country
    temp = data.main.temp
    const humidity = data.main.humidity
    const description = data.weather[0].description
    const icon = data.weather[0].icon

    const cityInfo = document.createElement('h2')
    cityInfo.textContent = `${cityName}, ${countryName}`
    cityInfo.classList.add('fade-in')

    const celciusLabel = document.getElementById('celciusLabel');
    celciusLabel.textContent = 'Change unit of measure';
    const unitOfMeasure = celciusCheckbox.checked ? ' (Celsius)' : ' (Fahrenheit)';
    celciusLabel.textContent = celciusLabel.innerText + unitOfMeasure;

    const tempInfo = document.createElement('p')
    tempInfo.id = 'tempInfo'
    tempInfo.textContent = document.getElementById('celciusCheckbox').checked ? `Temperature: ${Math.floor(temp-diffKelvin)}ºC` : `Temperature: ${Math.floor((temp - diffKelvin) * 9/5 + 32)}ºF`
    tempInfo.classList.add('fade-in')

    const humidityInfo = document.createElement('p')
    humidityInfo.textContent = `Humidity: ${humidity}%`
    humidityInfo.classList.add('fade-in')

    const icoInfo = document.createElement('img')
    icoInfo.src = `https://openweathermap.org/img/wn/${icon}@2x.png`
    icoInfo.alt = `Weather Icon: ${description}`
    icoInfo.classList.add('fade-in')

    const descriptionInfo = document.createElement('p')
    descriptionInfo.textContent = `Weather description: ${description}`
    descriptionInfo.classList.add('fade-in')

    divResponseData.appendChild(cityInfo)
    divResponseData.appendChild(tempInfo)
    divResponseData.appendChild(humidityInfo)
    divResponseData.appendChild(icoInfo)
    divResponseData.appendChild(descriptionInfo)
}

const toggleTemperatureUnit = () => {
    const tempInfoParragraph = document.getElementById('tempInfo');
    const celciusCheckbox = document.getElementById('celciusCheckbox');
    const celciusLabel = document.getElementById('celciusLabel');
    celciusLabel.textContent = 'Change unit of measure';

    const unitOfMeasure = celciusCheckbox.checked ? ' (Celsius)' : ' (Fahrenheit)';
    celciusLabel.textContent = celciusLabel.innerText + unitOfMeasure;

    if(tempInfoParragraph != null) {
            tempInfoParragraph.textContent = celciusCheckbox.checked ? `Temperature: ${Math.floor(temp-diffKelvin)}ºC` : `Temperature: ${Math.floor((temp - diffKelvin) * 9/5 + 32)}ºF`
    }
}