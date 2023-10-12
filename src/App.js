
import React,{ useState, useEffect }from 'react';
import axios from 'axios';
import dateFormat from 'dateformat';
import './index.css';

function App() {
  const [data, setData] = useState({})
  const [error, setError] = useState('')
  const [location,setLocation] = useState('')
  const [units, setUnits] = useState ('metric')
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=4232a7a1daf9d907ce115114831204ea`
  
  const getData = () =>{
    axios.get(url).then((response)=>{
    setData(response.data)
    console.log(response.data)
  })
  .catch (err => {
    if (err.response.status==404){
     setError('Invalid city name')
    } else {
     setError('')
    }
  console.log(err)
 });
  } 
  useEffect (()=>{
      getData();
      
    },[units])
     const searchLocation=(event) =>{
    if (event.key === 'Enter'){
    getData();
    setError('')
    setData('')
    
    }
  }

   const renderDate = () =>{
    let now = new Date();
    return dateFormat(now,"dddd,mmmm dS, h:MM TT")

   }

   const handleUnitsClick =(e) =>{
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    const isCelsius = currentUnit==="C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits (isCelsius ? "metric" : "imperial");
   }
 
  return (
    <div className={(data.main)? (units=="metric") ? ((data.main.temp >30)? 'app': 'app warm'):((data.main.temp>86)? 'app': 'app warm'):'app'}>
      <div className='search'>
        <input value={location}
        onChange={event=>setLocation(event.target.value)}
        onKeyPress = {searchLocation}
        placeholder='Enter location'
        type='text' required/>
        <button onClick={(e)=>handleUnitsClick(e)}>°F</button>
      </div>
    <div className='error'>
     <p>{error}</p>
       </div>
       
      <div className="container">
      <div className="top">
      <div className='location'>
        <p>{data.name}</p>
        
      </div>
     <div className='temp'>
      {data.main ? <h1>{`${data.main.temp.toFixed()}°${units==="metric" ? "C" : "F"} `}</h1> :null }
      {data.main ?<h5>{renderDate()}</h5> : null}
      {data.weather ?<img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="Image" className='weathicon'/> :null }
      </div>
      <div className='description'>
        {data.weather ? <p>{data.weather[0].main}</p> : null }
      </div> 
      </div>

{data.name!==undefined &&
      <div className="bottom">
      <div className='feels'>
      {data.main ? <p className='bold'>{`${data.main.feels_like.toFixed()}°${units==="metric" ? "C" : "F"} `}</p> : null }
        <p>Feels like</p>
      </div>
      <div className='humidity'>
      {data.main ? <p className='bold'>{data.main.humidity}%</p> : null }
        <p>Humidity</p>
      </div>
      <div className='wind'>
      {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null }
        <p>Wind</p>
      </div>
    </div>
}

{!data.weather && <div className='bottom'>
  <h3>NO data found</h3>
  </div>
}
      </div>
    </div>
  );
}
export default App;
