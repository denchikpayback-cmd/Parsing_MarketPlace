import "../../components style/Products.css";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchIcon, ClockIcon, BookmarkIcon, RefreshIcon} from "../Icons.jsx"
import { ProductCard } from "../ProductCard.jsx";
import { Profile } from "../Profile.jsx";
import { DirectHistory, DirectSearch } from "../../function/navigate.js";
import { SideBar } from "../SideBar.jsx";
export default function Products() {
    const location = useLocation();
    const directHistory = DirectHistory();
    const products = location.state?.products || [];
    console.log(products)
  
  return (
    <div className="app">
      <SideBar/>
      <main className="main">
        <header className="header">
          <div className="search-row">
            <div className="search-input">
              <SearchIcon />
              <span>{location.state.value}</span>
            </div>

            <button className="new-search" onClick={DirectSearch}>
              <RefreshIcon />
              Новый поиск
            </button>
          </div>

           <div className="summary">
            <span>Лучшая цена</span>
            <strong>{products?.[0].price} ₽</strong>

            <span className="summary-marketplace">
              <i />
              {products?.[0].marketplace}
            </span>

            <span className="summary-dot">·</span>

            <span className="muted">Xiaomi Official</span>

            <span className="summary-dot">·</span>

            <span>разброс</span>
            <strong>5 500 ₽</strong>
          </div>
        </header>

        <div className="filters">
          <button className="filter active">Дешевле</button>
          {/* <button className="filter">Дороже</button> */}
          <button className="filter">Рейтинг</button>

          <div className="filter-divider" />

          <span className="price-title">Цена ₽:</span>

          <div className="price-input">от</div>
          <span className="price-dash">—</span>
          <div className="price-input">до</div>

          <div className="filter-divider" />

          <button className="marketplace Wildberries">
            <i /> Wildberries
          </button>

          <button className="marketplace Ozon">
            <i /> Ozon
          </button>

          <button className="marketplace Ymarket">
            <i /> ЯМ
          </button>

          <button className="stock-filter">
            <span>✓</span>
            В наличии
          </button>

          <span className="offers">{products.length} предложений</span>
        </div> 

        <section className="products">
          {products.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </section>
      </main>
    </div>
  );
}
