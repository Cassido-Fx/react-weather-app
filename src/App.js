import React from 'react';
import axios from 'axios';
import { useState } from 'react';

function App() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=a119d419cb47e51582fcf368d9e86a83`;

  
  const searchLocation = (event) => {
    if (event.key === 'Enter' || event.type === 'click') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data);
      })
      setLocation('');
    }
  };

  return (
    <div className='app'>
      <div className="search-container">
      <div>
        <input 
        type="text" 
        placeholder='Enter Location'
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        />
      </div>
        <div>
          <button 
          className='search-button' onClick={searchLocation}>Search</button>
        </div>
      </div>
     
      <div className="container">

        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.main != undefined && 
          <div className="bottom">
          <div className="feels">
            {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p className='bold'>{data.wind.speed.toFixed()}MPH</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>
        }   
      </div>
    </div>
  );
}

export default App;
