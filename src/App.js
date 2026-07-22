import React, { useState, useRef } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  const inputRef = useRef(null)
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState()
  const [load, setLoad] = useState()
  const [err, setErr] = useState()
  const [flag, setFlag] = useState(false)

  async function weat(cityName) {
    try {
      const response = await fetch(`https://wttr.in/${cityName}?format=j1&lang=ru`)
      const data = await response.json()
      console.log(data)

      const foundCity = data?.nearest_area?.[0]?.areaName?.[0]?.value
      console.log("Найденный город:", foundCity)

      if (foundCity && foundCity.toLowerCase() === cityName.toLowerCase()) {
        console.log("Город найден:", cityName)
        setWeather(data)
        setCity(cityName)
        setErr("")
      } else {
        console.log("Город не найден, показан:", foundCity)
        setErr("Город не найден")
        setWeather(null)
        setFlag(false)
      }
    } catch (err1) {
      console.log(err1)
      setErr("Ошибка загрузки")
    }
  }
  return (
    <div className="App">
      <h1>🌤️ Погода</h1>

      <div className="search-row">
        <input type="text" ref={inputRef} placeholder="Введите город..." />
        <button onClick={() => {
          const cityName = inputRef.current.value
          setCity(cityName)
          weat(cityName)
          setFlag(true)
        }}>Найти</button>
      </div>

      {err && <p className="error">{err}</p>}

      {flag && weather ? (
        <Card city={city} data = {weather}/>
      ) : (
        <div className="desc">В каком городе хотите узнать погоду</div>
      )}
    </div>
  );
}

export default App;