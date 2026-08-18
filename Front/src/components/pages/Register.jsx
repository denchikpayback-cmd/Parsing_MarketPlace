import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../components style/Login.css"; // Используем те же стили, что и для логина!

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errEmail, setErrEmail] = useState("");
    const [errPassword, setErrPassword] = useState("");
    const navigate = useNavigate();

    const request = async () => {
        try {
            setErrEmail("");
            setErrPassword("");
            const res = await fetch("http://localhost:3001/user/authorization", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: "include"
            });
            const data = await res.json();
            
            let hasError = false;
            
            // Обработка ошибок валидации от сервера
            if (data?.success?.length > 0) {
                data.success.forEach(err => {
                    if (err.path === "email") {
                        setErrEmail("Почта не валидна");
                        hasError = true;
                    }
                    if (err.path === "password") {
                        setErrPassword("Пароль не валиден");
                        hasError = true;
                    }
                });
            }

            // ======= ГЛАВНОЕ ИСПРАВЛЕНИЕ =======
            // 1. Сначала проверяем: если есть ошибки, то мы ВООБЩЕ НИКУДА НЕ ИДЕМ.
            if (hasError) {
                return; // Просто выходим из функции, не делаем navigate
            }

            // 2. Если ошибок нет, и ответ сервера хороший - только тогда идем.
            if (res.ok) {
                navigate("/search");
            }
            // ===================================
            
        } catch (error) {
            console.log("Ошибка регистрации");
        }
    };
    
    function Direct() {
        navigate("/"); // Переход на страницу входа
    }

    async function Logout() {
        const res = await fetch("http://localhost:3001/user/logout", {
            method: "POST",
            credentials: "include"
        });
        if (res.ok) {
            console.log("Кука успешна удалена");
        } else {
            console.log("Кука не удалена");
        }
    }

    return (
        <div className="login-wrapper">
            {/* --- ЛЕВАЯ ЧАСТЬ (Информационная, идентична логину) --- */}
            <div className="login-left">
                <div className="logo-area">
                    <div className="logo-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2v4M12 22v-4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M22 12h-4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                            <circle cx="12" cy="12" r="4"/>
                        </svg>
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
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </div>
                            <div className="feature-text">
                                <h4>Умный поиск</h4>
                                <p>Находит все вариации и комплектации</p>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="feature-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                            </div>
                            <div className="feature-text">
                                <h4>3 маркетплейса</h4>
                                <p>WB, Ozon и Яндекс.Маркет одновременно</p>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="feature-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                            </div>
                            <div className="feature-text">
                                <h4>Мгновенно</h4>
                                <p>Результаты за 2–3 секунды</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- ПРАВАЯ ЧАСТЬ (Форма регистрации) --- */}
            <div className="login-right">
                <div className="login-form-container">
                    <h2>Регистрация</h2>
                    <p>Создайте аккаунт для начала работы</p>

                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="input-group">
                            <div className="input-label-row">
                                <label>EMAIL</label>
                            </div>
                            <input 
                                className="login-input" 
                                type="email" 
                                placeholder="Введите email:" 
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {/* Вывод ошибки под инпутом */}
                            {errEmail && <p className="error-msg" style={{ marginTop: '5px', textAlign: 'left' }}>{errEmail}</p>}
                        </div>

                        <div className="input-group">
                            <div className="input-label-row">
                                <label>ПАРОЛЬ</label>
                            </div>
                            <input 
                                className="login-input" 
                                type="password" 
                                placeholder="Введите password:" 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {/* Вывод ошибки под инпутом */}
                            {errPassword && <p className="error-msg" style={{ marginTop: '5px', textAlign: 'left' }}>{errPassword}</p>}
                        </div>

                        <button className="login-btn" type="button" onClick={request}>Зарегистрироваться</button>
                        
                        <div className="register-link-area">
                            Уже есть аккаунт? <span className="register-link" onClick={Direct}>Войти</span>
                        </div>

                      
                        <div className="register-link-area" style={{ marginTop: '15px', fontSize: '12px' }}>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
