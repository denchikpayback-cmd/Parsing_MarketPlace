import db from "../db.js/db.js"
import bcrypt from "bcrypt"
import { validationResult } from "express-validator";

class UserController {
    async registerUser(req, res) {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({success: errors.array()})
        }
        else{
            const {email, password} = req.body;
            const saltRounds = 10;
            const password_hash = await bcrypt.hash(password, saltRounds)
            const newUser = await db.query(`INSERT INTO users (email, password_hash) values ($1, $2) RETURNING *`, [email, password_hash])
            console.log(email, password_hash);
            res.json({ message: "ok" });
            console.log("Валидация успешная")
        }
        
    };
    async loginUser(req, res){
        console.log(req.body)
        const {email, password} = req.body;
        const oldUser = await db.query(`SELECT * FROM users WHERE email = $1`, [email])
        if(oldUser.rows.length === 0){
            res.status(401).json({error: "Пользователь не найден"})
        }
        else{
            const check = await bcrypt.compare(password, oldUser.rows[0].password_hash)
            if(check){
                res.status(200).json({success: "Успешно"})
            }
            else{
                res.status(404).json({succes: false})
            }
        }
    }
}


export default new UserController(); 
/**
 * =====================================================
 * КОНТРОЛЛЕРЫ ДЛЯ САЙТА-ПАРСЕРА МАРКЕТПЛЕЙСОВ (API)
 * =====================================================
 * 
 * Все контроллеры разбиты на 3 логические группы:
 * 1. ПОЛЬЗОВАТЕЛЬСКИЕ (User) - для всех
 * 2. ПАРСИНГА (Parser) - только для админа
 * 3. АДМИН-ПАНЕЛЬ (Admin) - только для админа
 * 
 * -----------------------------------------------------
 * 🔐  Middleware:
 * - auth    -> проверяет JWT и кладёт user в req.user
 * - admin   -> проверяет роль (req.user.role === 'admin')
 * =====================================================
 */

// =====================================================
// 1️⃣ ПОЛЬЗОВАТЕЛЬСКИЕ КОНТРОЛЛЕРЫ (User Controllers)
// Доступ: всем (или только авторизованным, где указано)
// =====================================================

/**
 * AuthController - регистрация, вход, выход
 * ----------------------------------------------
 * POST   /auth/register      - Регистрация нового пользователя (все)
 * POST   /auth/login         - Логин, выдача JWT (все)
 * POST   /auth/logout        - Выход (авторизованные)
 */
// Пример: auth.controller.js
/**
 * ProductsController - публичный просмотр товаров
 * ----------------------------------------------
 * GET    /products           - Список товаров (все, с пагинацией и фильтрами)
 * GET    /products/:id       - Карточка товара по артикулу (все)
 * GET    /products/search    - Поиск по названию/бренду (все)
 */
// Пример: products.controller.js

// =====================================================
// 2️⃣ КОНТРОЛЛЕРЫ ПАРСИНГА (Parser Controllers)
// Доступ: ТОЛЬКО АДМИН (auth + admin)
// =====================================================

/**
 * ParserController - управление задачами парсинга
 * ----------------------------------------------
 * POST   /parser/start       - Запустить парсинг (по артикулу, категории, всему)
 * GET    /parser/status      - Статус текущей задачи парсинга
 * POST   /parser/stop        - Остановить фоновый процесс
 * GET    /parser/history     - Лог последних запусков парсера
 * GET    /parser/task/:id    - Результат конкретной задачи
 */
// Пример: parser.controller.js

// =====================================================
// 3️⃣ АДМИН-КОНТРОЛЛЕРЫ (Admin Controllers)
// Доступ: ТОЛЬКО АДМИН (auth + admin)
// =====================================================

/**
 * AdminUsersController - управление пользователями
 * ----------------------------------------------
 * GET    /admin/users        - Список всех пользователей (с пагинацией)
 * GET    /admin/users/:id    - Данные конкретного пользователя
 * PUT    /admin/users/:id/role - Сменить роль (user/admin)
 * POST   /admin/users/:id/block - Заблокировать пользователя
 * POST   /admin/users/:id/unblock - Разблокировать пользователя
 * DELETE /admin/users/:id    - Удалить пользователя
 */
// Пример: admin/users.admin.controller.js

/**
 * AdminProductsController - управление товарами в БД
 * ----------------------------------------------
 * GET    /admin/products     - Список всех товаров в БД (пагинация)
 * GET    /admin/products/:id - Детальная карточка товара (все данные)
 * POST   /admin/products/:id/hide - Скрыть товар с витрины
 * POST   /admin/products/:id/show - Показать товар на витрине
 * DELETE /admin/products/:id - Удалить товар из БД (осторожно!)
 */
// Пример: admin/products.admin.controller.js

/**
 * AdminSettingsController - настройки сайта и парсера
 * ----------------------------------------------
 * GET    /admin/settings     - Получить текущие настройки
 * PUT    /admin/settings     - Изменить настройки (тайминги, прокси и т.д.)
 */
// Пример: admin/settings.admin.controller.js

/**
 * AdminStatsController - статистика
 * ----------------------------------------------
 * GET    /admin/stats        - Общая статистика:
 *        - сколько товаров в БД
 *        - сколько пользователей
 *        - сколько запросов в день/неделю
 *        - последние активности парсера
 */
// Пример: admin/stats.admin.controller.js

// =====================================================
// 🧠  ОСОБЫЕ СЦЕНАРИИ (дополнительно)
// =====================================================

/**
 * HealthController - проверка работы сервера
 * ----------------------------------------------
 * GET    /health             - Проверка статуса API (все)
 * GET    /health/db          - Проверка соединения с БД (админ)
 */

/**
 * WebhookController - если маркетплейсы шлют вебхуки
 * ----------------------------------------------
 * POST   /webhooks/wb        - Приём вебхуков от Wildberries (без авторизации)
 * POST   /webhooks/ozon      - Приём вебхуков от Ozon (без авторизации)
 */
// Пример: webhook.controller.js (если потребуется)

// =====================================================
// 📌  УТИЛИТЫ И MIDDLEWARE (напоминание)
// =====================================================

/**
 * Middleware для проверки ролей:
 * ----------------------------------------------
 * auth    -> проверяет JWT, кладёт user в req.user
 * admin   -> проверяет, что req.user.role === 'admin'
 * 
 * Использование в роутах:
 * router.get('/admin/users', auth, admin, adminUsersController.getAll);
 */

/**
 * Пагинация для всех GET-списков:
 * ----------------------------------------------
 * ?page=1&limit=20&sortBy=price&order=desc
 */

/**
 * Логирование действий админа:
 * ----------------------------------------------
 * - кто (userId)
 * - когда (timestamp)
 * - что сделал (действие)
 * - с какими данными работал (targetId, старая/новая роль)
 */