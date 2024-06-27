"use strict"
// currentDay
const currentDay = document.querySelector("#currentDay");
const currentDate = document.querySelector("#currentDate");
const country = document.querySelector("#country");
const currentDegree = document.querySelector("#currentDegree");
const meaningfullImageCurrentDay = document.querySelector("#meaningfullImageCurrentDay");
const meaningfullTextCurrentDay = document.querySelector("#meaningfullTextCurrentDay");


const winSpeed = document.getElementById('winSpeed');
const winDir = document.getElementById('winDir');
const avghumidity = document.getElementById('avghumidity');


// tomorrow day
const tomorrowDay = document.querySelector("#tomorrowDay");
const biggerDegreeTomorrowDay = document.querySelector("#biggerDegreeTomorrowDay");
const smallerDegreeTomorrowDay = document.querySelector("#smallerDegreeTomorrowDay");
const meaningfullTextTomorrowDay = document.querySelector("#meaningfullTextTomorrowDay");
const meaningfullImageTomorrowDay = document.querySelector("#meaningfullImageTomorrowDay");


// after tomorrow day
const afterTomorrowDay = document.querySelector("#afterTomorrowDay");
const biggerDegreeAfterTomorrowDay = document.querySelector("#biggerDegreeAfterTomorrowDay");
const smallerDegreeAfterTomorrowDay = document.querySelector("#smallerDegreeAfterTomorrowDay");
const meaningfullTextAfterTomorrowDay = document.querySelector("#meaningfullTextAfterTomorrowDay");
const meaningfullImageAfterTomorrowDay = document.querySelector("#meaningfullImageAfterTomorrowDay");




const serchInput = document.getElementById('searchCountry');
if(serchInput) {
    serchInput.addEventListener('input' , function() {
        weatherApi(serchInput.value)
    })
}


async function weatherApi(countryName) {

    await fetch(`http://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a315110121270&q=07112&days=3&q=${countryName}`,{
        method: 'POST'
    }).
    then(respons => respons.json()).
    then(respons => displayInfo(respons))
};





function displayInfo(info4ThreeDays) {
    //CURRENT DAY
    currentDay.innerHTML = getDayAsString(info4ThreeDays.forecast.forecastday[0].date.replace(/-+/g,' '));
    currentDate.innerHTML = getDateAsString(info4ThreeDays.forecast.forecastday[0].date.replace(/-+/g,' '));
    country.innerHTML = info4ThreeDays.location.name;
    currentDegree.innerHTML = `${info4ThreeDays.current.temp_c}<sup>o</sup>C`;
    meaningfullTextCurrentDay.innerHTML = info4ThreeDays.current.condition.text;
    meaningfullImageCurrentDay.setAttribute('src', `https:${info4ThreeDays.current.condition.icon}`)

    winSpeed.innerHTML = `${info4ThreeDays.current.wind_kph} km/h`
    winDir.innerHTML = getDirection(info4ThreeDays.current.wind_dir);
    avghumidity.innerHTML =`${info4ThreeDays.forecast.forecastday[0].day.avghumidity} %` ;

    //TOMORROW DAY
    tomorrowDay.innerHTML = getDayAsString(info4ThreeDays.forecast.forecastday[1].date.replace(/-+/g,' '));
    biggerDegreeTomorrowDay.innerHTML = `${info4ThreeDays.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C`;
    smallerDegreeTomorrowDay.innerHTML = `${info4ThreeDays.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>C`;
    meaningfullTextTomorrowDay.innerHTML = info4ThreeDays.forecast.forecastday[1].day.condition.text;
    meaningfullImageTomorrowDay.setAttribute('src', `https:${info4ThreeDays.forecast.forecastday[1].day.condition.icon}`)

    //AFTER TOMORROW DAY
    afterTomorrowDay.innerHTML = getDayAsString(info4ThreeDays.forecast.forecastday[2].date.replace(/-+/g,' '));
    biggerDegreeAfterTomorrowDay.innerHTML = `${info4ThreeDays.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C`;
    smallerDegreeAfterTomorrowDay.innerHTML = `${info4ThreeDays.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>C`;
    meaningfullImageAfterTomorrowDay.innerHTML = info4ThreeDays.forecast.forecastday[2].day.condition.text;
    meaningfullImageAfterTomorrowDay.setAttribute('src', `https:${info4ThreeDays.forecast.forecastday[2].day.condition.icon}`)
}


function getDayAsString(dateOfTheDay) {

    const day = new Date(dateOfTheDay);
    const days = {
        0 : 'Sunday',
        1 : 'Monday',
        2 : 'Tuesday',
        3 : 'Wednesday',
        4 : 'Thursday',
        5 : 'Friday',
        6 : 'Saturday',
    }
    return days[day.getDay()]
}
function getDateAsString(dateOfTheDay) {
    const day = new Date(dateOfTheDay);

    const Month = {
        0 : ' January',
        1 : ' February',
        2 : ' March',
        3 : ' April',
        4 : ' May',
        5 : ' June',
        6 : ' July',
        7 : ' August',
        8 : ' September',
        9 : ' October',
        10 : ' November',
        11 : ' December',
        
    }
    return day.getDate() + Month[day.getMonth()];
}
function getDirection(dire) {
    const dir = {
        'N' : 'North',
        'E' : 'East',
        'S' : 'South',
        'W' : 'West',

        'NE' : 'North East',
        'NS' : 'North South',
        'NW' : 'North West',

        'EN' : 'East North',
        'ES' : 'East South',
        'EW' : 'East West',

        'SN' : 'South North',
        'SE' : 'South East',
        'SW' : 'South West',

        'WN' : 'West North',
        'WE' : 'West East',
        'WS' : 'West South',
        'NNE' : 'north-northeast',
        'SSE' : 'south-southeast',
        'NNW' : 'north northwest',
        'WNW' : 'west northwest',
        
    }

    
    return dir[dire] ? dir[dire] : 'North';
}


function getCurrentCountry() {
    let successfulLookup = async function (position) {
      //destruction (property from Object)
      const {latitude, longitude } = position.coords;
      let currentCountry;
      //then el 7aga ele btrtrnha bseha lle b3deha
      await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=69a8f63e8b96415ea569992bd8980f56`).
      then(response => response.json()).then((response) =>  currentCountry = response.results[0].components.country);
      if(serchInput) {
        weatherApi(currentCountry);
      }
      
    }
    // btb3t el position f 7alt el nga7 k argument ll function successfulLookup >>> mnha ta5d el latitude , longitude
    navigator.geolocation.getCurrentPosition(successfulLookup);
}

getCurrentCountry();

// //////////////////////////////////////////////////
// //////////////////////////////////////////////////
// //////////////////////////////////////////////////
// //////////////////////////////////////////////////
// //////////////////////////////////////////////////

const homePage = document.getElementById('home')
const contactPage = document.getElementById('contact')
const aboutPage = document.getElementById('about')


homePage.addEventListener('click' , function() {
    location.assign('index.html')
})
contactPage.addEventListener('click' , function() {  
    location.assign('contact.html')

})
aboutPage.addEventListener('click' , function() {  
    location.assign('about.html')

})
