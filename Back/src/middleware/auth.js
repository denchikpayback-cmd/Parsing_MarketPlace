import jwt from "jsonwebtoken";

const cookie_options = {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 3600000
};

export const generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email
    }, "secret123", { expiresIn: "1h" });
};

export const setAuthCookie = (res, user) => {
    const token = generateToken(user);
    res.cookie("token", token, cookie_options);
    return token;
};

export const delCookie = async (res) => {
    try {
        await res.clearCookie("token", cookie_options);
        return console.log("Кука удалена");
    } catch (error) {
        console.log("Ошибка", error)
    }
    
};
export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, "secret123");
    req.userId = decoded.id;
    console.log(decoded.id)
    if (!token) {
        console.log("Пользователь не авторизован")
        return res.status(401).json({
            success: false,
            message: "Пользователь не авторизован"
        });
    }
    
    try {
        const decoded = jwt.verify(token, "secret123");
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,  
            message: "Неверный или просроченный токен"
        });
    }
};

export const setAuthResponse = (res, user) => {
    setAuthCookie(res, user);
    return res.status(200).json({
        success: true,
        message: "Успешно",
        email: user.email
    });
};
