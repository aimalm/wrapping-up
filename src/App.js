import React, { useState } from 'react';
import defaultImag from './assets/warm-bg.jpg';


const api = {
  key: "f93f0f6ec73b9962c8732f8123da14d5",
  base: "https://api.openweathermap.org/data/2.5/"
}
const key2 = "1AtTqASnS-chw9VgN_btgruDd8sdggmuUpUwbk5RAJM";

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [bgImage, setBgImage] = useState(`" ${defaultImag}"`);



  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          //console.log(result);
        });


        fetch("https://api.unsplash.com/search/photos?query=" + query + "&client_id=" + key2 + "&per_page=1")
        .then((response)=> response.json())
        .then((data) => {
            
            //grab the url from json 
            //return "background-image: url('" + data.results[0].urls.small + "')";
            //change background image url
            //const image = "url('"+ data.results[0].urls.small +"')";
             setBgImage(data.results[0].urls.small);

           
        })
        setQuery('');

    }
  }



//console.log(backgroundImage("london"));

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div style={{ backgroundImage: `url("${bgImage}")` }} class="app"    >
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
