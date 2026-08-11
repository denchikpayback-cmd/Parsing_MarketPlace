import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [flag, setFlag] = useState("")
    const navigate = useNavigate();

    const request = async () => {
        const res = await fetch("http://localhost:3001/user/login", {
            method: "POST",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({email, password})
        })
        if(res.ok){
            navigate("/")
            console.log("Успешный вход")
        }
        else{
            setFlag("Неверная почта или пароль")
        }
    }
    function Direct(){
        navigate("/authorization")

    }
    return(
        <div>
            <form>
                <h1>Форма входа в аккаунт</h1>
                <input type="email" placeholder="Введите email:" onChange={(e) => {setEmail(e.target.value)}}></input>
                <input type="password" placeholder="Введите password:" onChange={(e) => {setPassword(e.target.value)}}></input>
                <button type="button" onClick={request}>Зарегестрироваться</button>
                <p onClick={Direct}>Создать аккаунт</p>
                <p>{flag}</p>
            </form>
        </div>
    )
}
export default Login;