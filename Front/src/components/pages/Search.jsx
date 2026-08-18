import "../../components style/Search.css"; 
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function SearchPage() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState("");
    const [flag, setFlag] = useState(false);
    const [userEmail, setUserEmail] = useState("")

    useEffect(() => {
        const savedEmail = localStorage.getItem("userEmail");
        if(savedEmail){
            setUserEmail(savedEmail)
        } 
    }, [])

    function Direct() {
        navigate("/authorization");
    }

    const request = async () => {
        const res = await fetch("http://localhost:3001/product/list_products", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify({ inputValue })
        })
        if (res.ok) {
            console.log(await res.json());
        } else {
            setFlag(true)
            console.log("Пользователь НЕ авторизован");
            return false;
        }
    }

    // --- ДОБАВЛЕНА ФУНКЦИЯ ВЫХОДА ---
    async function Logout(){
        const res = await fetch("http://localhost:3001/user/logout",{
            method: "POST",
            credentials: "include"
        });
        if(res.ok){
            console.log("Кука успешна удалена");
            localStorage.removeItem("userEmail")
            navigate("/"); // После выхода перекидываем на страницу входа
        }else{
            console.log("Кука не удалена");
        }
    }

    return (
        <div className="search-layout">
            {/* --- БОКОВАЯ ПАНЕЛЬ --- */}
            <div className="sidebar">
                {/* Логотип */}
                <div className="sidebar-brand">
                    <div className="brand-logo">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 22v-4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M22 12h-4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="4"/></svg>
                    </div>
                    <div className="brand-text">
                        <h3>Parser.com</h3>
                        <span>Price Scanner</span>
                    </div>
                </div>

                {/* Меню навигации */}
                <div className="sidebar-menu">
                    <div className="menu-item active">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        Поиск
                    </div>
                    <div className="menu-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        История
                        <span className="badge">6</span>
                    </div>
                    <div className="menu-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                        Избранное
                        <span className="badge">3</span>
                    </div>
                    <div className="menu-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                        Настройки
                    </div>
                </div>

                {/* --- НИЖНЯЯ ЧАСТЬ САЙДБАРА (Профиль + Выход) --- */}
                <div className="sidebar-footer-section">
                    {/* Профиль (переход на вход) */}
                    <div className="sidebar-footer" onClick={Direct}>
                        <div className="user-avatar">{userEmail ? userEmail.slice(0, 2).toUpperCase() : "G"}</div>
                        <div className="user-info">
                            <h4>{userEmail ? userEmail : "Guest"}</h4>
                            <span>Pro</span>
                        </div>
                    </div>

                    {/* Кнопка выхода */}
                    <div className="sidebar-logout" onClick={Logout}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        Выйти
                    </div>
                </div>
            </div>

            {/* --- ОСНОВНОЙ КОНТЕНТ --- */}
            <div className="main-content">
                
                {/* Блок поиска */}
                <div className="search-container">
                    <div className="search-icon-big">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </div>
                    
                    <h1>Найдите самый дешёвый товар</h1>
                    <p className="desc">
                        Вводите запрос — мы одновременно парсим несколько маркетплейсов и находим лучшую цену
                    </p>

                    <div className="search-box-wrap">
                        <div className="search-input-wrapper">
                            <div className="search-icon-inside">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            </div>
                            <input 
                                className="search-input"
                                type="text"
                                placeholder="Например: iPhone 16 Pro 256GB или Dyson V15..."
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            {flag ? <p className="text">Пользователь не авторизован</p> : <p></p>}
                        </div>
                        <div className="marketplace-filters">
                            <span>Маркетплейсы:</span>
                            <div className="filter-chip"><span className="dot dot-wb"></span> Wildberries</div>
                            <div className="filter-chip"><span className="dot dot-ozon"></span> Ozon</div>
                            <div className="filter-chip"><span className="dot dot-ym"></span> Яндекс.Маркет</div>
                        </div>

                        <button className="search-btn" disabled={!inputValue} onClick={() => request()}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            Найти дешевле
                        </button>
                    </div>
                </div>

                {/* Секция недавних запросов */}
                <div className="recent-section">
                    <h3 className="recent-title">НЕДАВНИЕ ЗАПРОСЫ</h3>
                    <div className="recent-grid">
                        <div className="recent-card">
                            <div className="recent-info">
                                <h4>Xiaomi 14T Pro</h4>
                                <div className="recent-meta">
                                    <span className="recent-price">12 998 ₽</span>
                                    <span className="recent-tag"><span className="dot dot-wb"></span>Wildberries</span>
                                </div>
                            </div>
                            <div className="recent-arrow">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </div>

                        <div className="recent-card">
                            <div className="recent-info">
                                <h4>iPhone 16 Pro 256GB</h4>
                                <div className="recent-meta">
                                    <span className="recent-price">97 498 ₽</span>
                                    <span className="recent-tag"><span className="dot dot-ozon"></span>Ozon</span>
                                </div>
                            </div>
                            <div className="recent-arrow">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </div>

                        <div className="recent-card">
                            <div className="recent-info">
                                <h4>Sony WH-1000XM6</h4>
                                <div className="recent-meta">
                                    <span className="recent-price">24 998 ₽</span>
                                    <span className="recent-tag"><span className="dot dot-ozon"></span>Ozon</span>
                                </div>
                            </div>
                            <div className="recent-arrow">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </div>

                        <div className="recent-card">
                            <div className="recent-info">
                                <h4>MacBook Air M3 16GB</h4>
                                <div className="recent-meta">
                                    <span className="recent-price">129 998 ₽</span>
                                    <span className="recent-tag"><span className="dot dot-wb"></span>Wildberries</span>
                                </div>
                            </div>
                            <div className="recent-arrow">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SearchPage;