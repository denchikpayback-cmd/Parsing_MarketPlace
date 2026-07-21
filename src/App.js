import "./App.css";
import Button from "./components/button";
import React, {useState} from "react";

function App() {

  const [value, setValue] = useState('')
  const [value1, setValue1] = useState('')
  const [char, setChar] = useState('')
  const [flag, setFlag] = useState(false)

  const handleNumber = (num) => {
    if(flag == false){
      setValue(value => value + `${num}`)
    }
    else{
      setValue1(value1 => value1 + `${num}`)
    }
  };

  const handleChar = (char1) => {
    if(char1 === "="){
      const num1 = Number(value)
      const num2 = Number(value1)
      
      const operations = {
        "+": num1 + num2,
        "-": num1 - num2,
        "*": num1 * num2,
        "/": num1 / num2
      }
      
      setValue(String(operations[char]))
      setValue1("")
      setChar("")
      setFlag(false)
    }
    else{
      setChar(char1)
      setFlag(true)
    }
  }
  
  const handleClear = () => {
    setValue('')
    setValue1('')
  }
  return (
    <div className="perimetr">
      <div className="perimetr_display">{flag ? value1 : value}</div>
      <div className="btns">
        <Button label="C" onClick={handleClear} />
        <Button label="=" onClick={() => handleChar("=")} />
        <Button label="-" onClick={() => handleChar("-")} />
        <Button label="+" onClick={() => handleChar("+")} />
        <Button label="/" onClick={() => handleChar("/")} />
        <Button label="*" onClick={() => handleChar("*")} />
        <Button label="9" onClick={() => handleNumber("9")} />
        <Button label="8" onClick={() => handleNumber("8")} />
        <Button label="7" onClick={() => handleNumber("7")} />
        <Button label="6" onClick={() => handleNumber("6")} />
        <Button label="5" onClick={() => handleNumber("5")} />
        <Button label="4" onClick={() => handleNumber("4")} />
        <Button label="3" onClick={() => handleNumber("3")} />
        <Button label="2" onClick={() => handleNumber("2")} />
        <Button label="1" onClick={() => handleNumber("1")} />
        <Button label="0" onClick={() => handleNumber("0")} />
      </div>
    </div>
  );
}
export default App;