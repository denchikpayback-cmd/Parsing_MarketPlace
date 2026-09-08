import "../components style/HistoryPage.css"

function HistoryItem({ product }) {
    async function Del(){
    const email = localStorage.getItem("userEmail")
    const res = await fetch("http://localhost:3001/product/delete", {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({date: product.timestamp, email: email}),
        credentials: "include"
    });
    
    console.log("Статус ответа:", res.status); 
    
    if(res.ok){
        console.log("DELETE");
        window.location.reload();
    }
}
    return (
        <div className="history-item">
            <div className="history-item-content">
                <div className="item-left">
                    <div className="item-header">
                        <span className="item-name">{product.name}</span>
                        <button className="favorite-btn active">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
                            </svg>
                        </button>
                    </div>
                    
                    <div className="item-details">
                        <span className="item-price">{product.price} ₽ </span>
                        <span className="item-brand">{product.brand}</span>
                    </div>
                    
                    <div className="item-tags">
                        <span className="marketplace-badge badge-wildberries">{product.marketplace}</span>
                        <span className="item-rating">
                            <span className="star">⭐</span> {product.rating}
                        </span>
                    </div>
                    
                    <div className="item-footer">
                        <span className="item-date">🕐 {product.timestamp}</span>
                    </div>
                </div>
                
                <div className="item-right">
                    <button className="repeat-search-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 4v6h6" />
                            <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
                        </svg>
                        Повторить
                    </button>
                    <button className="delete-item-btn" onClick={Del}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HistoryItem;