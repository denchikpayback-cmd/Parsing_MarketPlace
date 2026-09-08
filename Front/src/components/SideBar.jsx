import { SearchIcon, ClockIcon, BookmarkIcon } from "./Icons";
import { Profile } from "./Profile";
import { DirectHistory } from "../function/navigate";
import { useState, useEffect } from "react";
import { HistoryReq } from "../function/requests";
import { useLocation, useNavigate } from "react-router-dom";

export function SideBar(){
    const navigate = useNavigate();
    const location = useLocation();
    const directHistory = DirectHistory();
    const [searchCount, setSearchCount] = useState(0);
    
    useEffect(() => {
        async function loadCount() {
            try {
                const data = await HistoryReq();
                const count = Array.isArray(data) ? data.length : 0;
                setSearchCount(count);
            } catch (error) {
                console.error('Ошибка загрузки истории:', error);
            }
        }
        loadCount();
    }, []);
    const currentPath = location.pathname;
    
    return(
        <div className="sidebar">
            <div className="sidebar-brand">
                <div className="brand-logo">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v4M12 22v-4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M22 12h-4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                        <circle cx="12" cy="12" r="4"/>
                    </svg>
                </div>
                <div className="brand-text">
                    <h3>Parser.com</h3>
                    <span>Price Scanner</span>
                </div>
            </div>

            <div className="sidebar-menu">
                <div 
                    className={`menu-item ${currentPath === '/' || currentPath === '/search' ? 'active' : ''}`}
                    onClick={() => navigate('/search')}
                >
                    <SearchIcon/>
                    <span>Поиск</span>
                </div>
                <div 
                    className={`menu-item ${currentPath === '/history' ? 'active' : ''}`}
                    onClick={directHistory}
                >
                    <ClockIcon/>
                    <span>История</span>
                    <span className="badge">{searchCount}</span>
                </div>
                <div 
                    className={`menu-item ${currentPath === '/favorites' ? 'active' : ''}`}
                    onClick={() => navigate('/favorites')}
                >
                    <BookmarkIcon/>
                    <span>Избранное</span>
                    <span className="badge">3</span>
                </div>
            </div>
            <Profile/>
        </div>
    );
}