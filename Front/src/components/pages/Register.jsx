import { useState} from "react";
import { useNavigate } from "react-router-dom";


function Register(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const [errEmail,   setErrEmail] = useState("")
    const [errPassword,   setErrPassword] = useState("")
    const request = async () => {
        try {
            setErrEmail("")
            setErrPassword("")
            const res = await fetch("http://localhost:3001/user/authorization", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
            })
            const data = await res.json();
            if (data?.success?.length > 0) {
                data.success.forEach(err => {
            if (err.path === "email") {
                setErrEmail("Почта не валидна")
                console.log("Ошибка в email: " + err.msg);
            }
            if (err.path === "password") {
                setErrPassword("Пароль не валиден")
                console.log("Ошибка в пароле: " + err.msg);
            }
            });
            }
            if(res.ok) {
                console.log("Успешная регистрация")
                navigate("/")
            } 
        } catch (error) {
            console.log("Ошибка регистрации")
        }
        
    };
    function Direct(){
        navigate("/login")
    }
    return(
        <form >
            <h1>Форма регистрации</h1>
            <input onChange={(e) => setEmail(e.target.value)}type="email"  placeholder="Введите email:" />
            <input onChange={(e) => setPassword(e.target.value)}type="password"  placeholder="Введите password:" />
            <button onClick={request} type="button">Зарегестрироваться</button>
            <p onClick={Direct}>Войти в аккаунт</p>
            <p>{errEmail}</p>
            <p>{errPassword}</p>
        </form>
    )
} 

export default Register;
