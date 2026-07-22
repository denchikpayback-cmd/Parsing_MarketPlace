import "./Card.css"

function Card({city, data}){
    console.log("sasaf", data)
    return(
        <div className="weather-card">
        <h2>{data?.nearest_area?.[0]?.areaName?.[0]?.value}</h2>
        <div className="temp">{data?.weather?.[0]?.avgtempC}</div>
        <div className="desc">{data?.current_condition[0]?.weatherDesc[0]?.value}</div>
        <div className="details">
          <span>💧 {data.current_condition[0].humidity} %</span>
          <span>💨 {data.current_condition[0].windspeedKmph} км/ч</span>
        </div>
      </div>
    )
}
export default Card;