import { useState, useEffect } from 'react';
import '../../components style/HistoryPage.css';
import HistoryItem from '../HistoryItem';
import { HistoryReq } from '../../function/requests.js';
import { SideBar } from '../SideBar.jsx';

export function HistoryPage() {
    const [historyData, setHistoryData] = useState([]);
    
    useEffect(() => {
        async function loadHistory() {
            const data = await HistoryReq();
            setHistoryData(data);
            localStorage.setItem("searchCount", String(data.length));
        }
        loadHistory();
    }, []);

    const getStats = () => {
        if (!historyData.length) return null;
        
        const prices = historyData.map(item => item.price || 0);
        const ratings = historyData.map(item => parseFloat(item.rating) || 0);
        const maxPrice = Math.max(...prices);
        const avgRating = (ratings.reduce((a, b) => a + b, 0) / ratings.length || 0).toFixed(1);
        const marketplaces = new Set(historyData.map(item => item.marketplace));
        
        return { maxPrice, avgRating, marketplaces: marketplaces.size };
    };
    
    const stats = getStats();
    console.log(historyData)
    return (
        <div className="history-page">
            <SideBar />
            <div className="history-content">
                {stats && (
                    <div className="history-stats">
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-icon">🛒</div>
                                <div className="stat-info">
                                    <span className="stat-value">{historyData.length}</span>
                                    <span className="stat-label">Всего запросов</span>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">💰</div>
                                <div className="stat-info">
                                    <span className="stat-value">{stats.maxPrice.toLocaleString()} ₽</span>
                                    <span className="stat-label">Макс. цена</span>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">⭐</div>
                                <div className="stat-info">
                                    <span className="stat-value">{stats.avgRating}</span>
                                    <span className="stat-label">Ср. рейтинг</span>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">🏪</div>
                                <div className="stat-info">
                                    <span className="stat-value">{stats.marketplaces}</span>
                                    <span className="stat-label">Магазинов</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                <div className="history-header">
                    <div className="header-left">
                        <h1>История поиска</h1>
                    </div>
                    <button className="clear-history-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                            <path d="M10 11v6M14 11v6" />
                        </svg>
                        Очистить историю
                    </button>
                </div>

                <div className="history-list">
                    {historyData && historyData.length > 0 ? (
                        historyData.map((item, index) => (
                            <HistoryItem key={index} product={item}/>
                        ))
                    ) : (
                        <div className="empty-history">
                            <div className="empty-icon">🔍</div>
                            <h3>История пуста</h3>
                            <p>Начните поиск, чтобы увидеть историю</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HistoryPage;