import "../../components style/Search.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RecentSearches } from "../RecentSearches";
import { Logout } from "../../function/userRegister.js";

import { SideBar } from "../SideBar.jsx";
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

    const request = async () => {
        const res = await fetch("http://localhost:3001/product/list_products", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify({ inputValue })
        })
        const data = await res.json()
        if (res.ok) {
            console.log("Отправляю данные:", data.search[0]); 
            navigate("/products", { 
                state: { products: data.search, value: inputValue }
            });
        } else {
            setFlag(true)
            console.log("Пользователь НЕ авторизован");
            return false;
        }
    }

    return (
        <div className="search-layout">
            <SideBar/>

            <div className="main-content">
                <div className="search-container">
                    <div className="search-icon-big">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"/>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                    </div>
                    
                    <h1>Найдите самый дешёвый товар</h1>
                    <p className="desc">
                        Вводите запрос — мы одновременно парсим несколько маркетплейсов и находим лучшую цену
                    </p>

                    <div className="search-box-wrap">
                        <div className="search-input-wrapper">
                            <div className="search-icon-inside">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"/>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                                </svg>
                            </div>
                            <input 
                                className="search-input"
                                type="text"
                                placeholder="Например: iPhone 16 Pro 256GB или Dyson V15..."
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            {flag ? <p className="text">Пользователь не авторизован</p> : null}
                        </div>
                        <div className="marketplace-filters">
                            <span>Маркетплейсы:</span>
                            <div className="filter-chip"><span className="dot dot-wb"></span> Wildberries</div>
                            <div className="filter-chip"><span className="dot dot-ozon"></span> Ozon</div>
                            <div className="filter-chip"><span className="dot dot-ym"></span> Яндекс.Маркет</div>
                        </div>

                        <button className="search-btn" disabled={!inputValue} onClick={() => request()}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"/>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                            </svg>
                            Найти дешевле
                        </button>
                    </div>
                </div>

                <div className="recent-section">
                    <h3 className="recent-title">НЕДАВНИЕ ЗАПРОСЫ</h3>
                    <div className="recent-grid">
                        <RecentSearches/>
                        {/* <RecentSearches/>
                        <RecentSearches/>
                        <RecentSearches/>
                        <RecentSearches/>
                        <RecentSearches/>
                        <RecentSearches/> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Logout };
export default SearchPage;