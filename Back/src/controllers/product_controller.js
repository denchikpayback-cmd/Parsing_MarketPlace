import db from "../db.js/db.js";
import { transliterate } from 'transliteration';

class ProductController {
    async getProduct(req, res) {
        try {
            const userQuery = req.body.inputValue;
const translitQuery = transliterate(userQuery);

await db.query('SET pg_trgm.similarity_threshold = 0.05');

const search = await db.query(
    `
    SELECT *,
    similarity(name, $1) AS similarity,
    (similarity(name, $1) * 10 - price/1000) AS score
    FROM products
    WHERE name % $1
    ORDER BY score DESC
    `,
    [translitQuery]
);


const favorite = await db.query(
    `UPDATE users 
    SET history_request = COALESCE(history_request, '[]'::jsonb) || $1::jsonb 
    WHERE id = $2`,
    [JSON.stringify([{
        inputValue: userQuery,
        timestamp: new Date().toLocaleString(),
        name: search.rows?.[0]?.name,
        price: search.rows?.[0]?.price,
        brand: search.rows?.[0]?.brand,
        marketplace: search.rows?.[0]?.marketplace,
        rating: search.rows?.[0]?.rating,
    }]), req.userId]  
);

console.log(search.rows[0]);

            res.json({ search: search?.rows || []});
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    };
    async getHistory(req, res){
    try {
        const history = await db.query(
            `SELECT history_request FROM users WHERE id = $1`,
            [req.userId]
        );
        
        const historyData = history.rows[0]?.history_request || [];
        
        res.json({ 
            data: Array.isArray(historyData) ? historyData.reverse() : historyData 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}
    async DelHistory(req, res) {
    const { email, date } = req.body;
    
    const result = await db.query(
        `SELECT history_request FROM users WHERE email = $1`,
        [email]
    );
    
    let history = result.rows[0]?.history_request || [];
    console.log(history)
    history = history.filter(item => item.timestamp !== date);
    
    await db.query(
        `UPDATE users SET history_request = $1::jsonb WHERE email = $2`,
        [JSON.stringify(history), email]
    );
    
    res.json({ success: true });
}
}

export default new ProductController();