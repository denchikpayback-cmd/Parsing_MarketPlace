import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../components style/Login.css";
import { loginRequest } from "../../function/userRegister";
import { DirectAuth } from "../../function/navigate";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [flag, setFlag] = useState("");
    const navigate = useNavigate();

    const request = async () => {
        if(!email || !password) {
            setFlag("Заполните все поля");
            return;
        }
        
        const { res, data } = await loginRequest(email, password);
        
        if(res.ok){
            if(data.email){
                localStorage.setItem("userEmail", data.email);
                navigate("/search");
                console.log("Успешный вход");
            }
        } else {
            setFlag("Неверная почта или пароль");
        }
    }

    

    return (
        <div className="login-wrapper">
            <div className="login-left">
                <div className="logo-area">
                    <div className="logo-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 22v-4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M22 12h-4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="4"/></svg>
                    </div>
                    <span>Parser.com</span>
                </div>

                <div className="left-content">
                    <h1>
                        Находите самые <br />
                        <span className="green-accent">дешёвые товары</span> <br />
                        за секунды
                    </h1>
                    <p className="subtitle">
                        Введите название товара — парсер одновременно ищет на Wildberries, Ozon и Яндекс.Маркете и показывает лучшую цену.
                    </p>

                    <div className="feature-cards">
                        <div className="feature-item">
                            <div className="feature-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            </div>
                            <div className="feature-text">
                                <h4>Умный поиск</h4>
                                <p>Находит все вариации и комплектации</p>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="feature-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            </div>
                            <div className="feature-text">
                                <h4>3 маркетплейса</h4>
                                <p>WB, Ozon и Яндекс.Маркет одновременно</p>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="feature-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            </div>
                            <div className="feature-text">
                                <h4>Мгновенно</h4>
                                <p>Результаты за 2–3 секунды</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="login-right">
                <div className="login-form-container">
                    <h2>Войти в аккаунт</h2>
                    <p>Введите данные для входа</p>

                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="input-group">
                            <div className="input-label-row">
                                <label>EMAIL</label>
                            </div>
                            <input 
                                className="login-input" 
                                type="email" 
                                placeholder="Email" 
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <div className="input-label-row">
                                <label>ПАРОЛЬ</label>
                                <span className="forgot-link">Забыли?</span>
                            </div>
                            <input 
                                className="login-input" 
                                type="password" 
                                placeholder="•••••••" 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button className="login-btn" type="button" onClick={request}>Войти</button>
                        
                        <div className="register-link-area">
                            Нет аккаунта? <span className="register-link" onClick={DirectAuth}>Зарегистрироваться</span>
                        </div>

                        {flag && <p className="error-msg">{flag}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;