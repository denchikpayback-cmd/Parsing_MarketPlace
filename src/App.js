import Cards from ".//components/Card.jsx";
import "./App.css"
function App() {
  
  return (
    <div className="root">
      <p>Введите товар который хотите найти</p>
      <input className="search_row"></input>
      <button>Найти товар</button>
      <div className="scrol_product">
        <Cards/>
        <Cards/>
        <Cards/>
        <Cards/>
        <Cards/>
        <Cards/>
        <Cards/>
      </div>
    </div>
    
  );
}

export default App;