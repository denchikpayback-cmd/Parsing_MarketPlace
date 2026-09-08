import "../components style/RecentSearches.css"

export function RecentSearches() {
  return (
    <div className="query-item">
      <div className="query-info">
        <div className="query-header">
          <span className="query-name">Xiaomi 14T Pro</span>
        </div>
        <div className="query-meta">
          <span className="query-price">12 998 ₽</span>
          <span className="marketplace-badge badge-wildberries">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            Wildberries
          </span>
        </div>
      </div>
      <button className="find-btn">Найти</button>
    </div>
  )
}

export default RecentSearches