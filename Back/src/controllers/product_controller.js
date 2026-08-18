import db from "../db.js/db.js"

class ProductController{
    async getProduct(req, res){
        const search = await db.query('SELECT * FROM products WHERE name = $1', [req.body.inputValue]);
        console.log(search.rows)
        return search;
    }
}

export default new ProductController();