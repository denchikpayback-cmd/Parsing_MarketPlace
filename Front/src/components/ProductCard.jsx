import {TruckIcon, ExternalIcon} from "./Icons"



export function ProductCard({product}) {
  return (
    <article className={`product-card ${product.best ? "best-card" : ""}`}>
      <div className={`card-top ${product.type}`}>
        <span className={`marketplace ${product.marketplace}`}>
          <i />
          {product.marketplace}
        </span>

        {product.best && <span className="best-label">ЛУЧШАЯ ЦЕНА</span>}
      </div>

      <div className={`product-image ${product.type}`}>
        <div className="phone-placeholder">
          <div className="phone-dot" />
        </div>
      </div>

      <div className="product-content">
        <h3>{product.name}</h3>

        <p className="description">{product.description}</p>

        <div className="seller">
          {/* <span className="seller-id">{product.id}</span> */}
          <span>{product.brand}</span>
        </div>
      </div>

      <div className="price-section">
        {product.oldPrice && (
          <div className="old-price-row">
            <span className="old-price">{product.oldPrice}</span>
            <span className="discount">{product.discount}</span>
          </div>
        )}

        <div className="price">{product.price}</div>

        {product.saving && (
          <div className="saving">{product.saving}</div>
        )}

        <div className="rating-row">
          <span className="stars">★★★★★</span>
          <strong>{product.rating}</strong>
          <span>{product.reviews}</span>
        </div>

        <div className="delivery">
          <TruckIcon />
          <span>{product.delivery}</span>
        </div>

        <button className="marketplace-button">
          <ExternalIcon />
          Открыть на маркетплейсе
        </button>
      </div>
    </article>
  );
}
