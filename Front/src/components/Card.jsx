// в карточке должны быть: картинка, цена, название, бренд, оригинал или нет, рейтинг, когда товар придет
// внутри самой карточки должно быть описание, отзывы, график сколько продано товаров, артикул, кнопка с ссылкой посмотреть на WB
import "../components style/cards.css"
function Cards(){
    return(
        <div className="r">
            <img src="https://mow-basket-cdn-01.geobasket.ru/vol1487/part148767/148767359/images/big/1.webp" alt="" className="card_img" />
            <p>387 ₽</p>
        </div>
    );
} 
export default Cards;