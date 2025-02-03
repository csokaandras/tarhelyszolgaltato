const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { getRepository } = require('typeorm');
const User = require('../entities/User');  // Feltételezve, hogy van egy User entitásod
 
export const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
 
    if (!token){
        return res.status(400).json({
            success: false,
            message: 'Hozzáférés megtagadva! Hiányzó token!'
        });
    }
 
    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded;
 
        // Ha szükséges a felhasználó adatainak lekérése a TypeORM segítségével:
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({ where: { id: decoded.userId } });
 
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Felhasználó nem található!'
            });
        }
 
        req.userDetails = user;  // A felhasználó adatainak hozzáadása a kéréshez
        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Érvénytelen vagy lejárt token!'
        });
    }
};