// for today
let todayName = document.getElementById("todayDateName");
let todayNumber = document.getElementById("todayDateNumber");
let todayMonth = document.getElementById("todayDateMonth")
let todayLocation = document.getElementById("todayLocation");
let todayTemperature = document.getElementById("todayTemp");
let todayConditionImg = document.getElementById("todayImg");
let todayConditionText = document.getElementById("todayText");
let humidity= document.getElementById("humidity");
let windSpeed= document.getElementById("windSpeed");
let windDirection= document.getElementById("windDirection");


// next day

let nextDayName = document.getElementsByClassName("nextDayName");
let nextConditionImg = document.getElementsByClassName("nextConditionImg");
let nextMaxTemp = document.getElementsByClassName("nextMaxTemp");
let nextMinTemp = document.getElementsByClassName("nextMinTemp");
let nextConditionText = document.getElementsByClassName("nextConditionText");

// tomorrow

// let afterNextDayName = document.getElementsByClassName


// search input

let searchInput = document.getElementById("searchInput");

async function getAllWetherData(cityName){
   let res= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=66c8404134414502997100315240210&q=${cityName}&days=3`)
   let weatherData = await res.json()
   return weatherData
}


function displayToday(data){
   let todayDate = new Date();
   todayName.innerHTML = todayDate.toLocaleDateString('en-US',{weekday:"long"});
   todayNumber.innerHTML = todayDate.getDate();
   todayMonth.innerHTML = todayDate.toLocaleDateString('en-US',{month:"long"});

   todayLocation.innerHTML = data.location.name;
   todayTemperature.innerHTML = data.current.temp_c;
   todayConditionImg.setAttribute('src', data.current.condition.icon);
   todayConditionText.innerHTML = data.current.condition.text;
   humidity.innerHTML = data.current.humidity+'%';
   windSpeed.innerHTML = data.current.wind_kph+'km/h';
   windDirection.innerHTML = data.current.wind_dir;
}

function displayNextDay(data){
   // let forecastData = data.forecast.forecastday
   for(let i = 0; i < 2 ; i++){
      let nextDate = new Date(data.forecast.forecastday[i+1].date);
      nextDayName[i].innerHTML = nextDate.toLocaleDateString('en-US',{weekday:"long"});
      nextMaxTemp[i].innerHTML = data.forecast.forecastday[i+1].day.maxtemp_c;
      nextMinTemp[i].innerHTML = data.forecast.forecastday[i+1].day.mintemp_c;
      nextConditionImg[i].setAttribute('src', data.forecast.forecastday[i+1].day.condition.icon );
      nextConditionText[i].innerHTML = data.forecast.forecastday[i+1].day.condition.text;

   }
   



}



async function app(city='cairo'){
   let weatherData = await getAllWetherData(city)
   if(!weatherData.error){
      displayToday(weatherData)
      displayNextDay(weatherData)
   }

}

app()


searchInput.addEventListener('input',function(){
   app(searchInput.value)
})