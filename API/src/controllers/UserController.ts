const { getRepository } = require("typeorm");
const User = require("../entities/User");

export const register = async (req, res, next) => {
    try {
        const { name, email, password, phone, address } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Hiányzó adatok!" });
        }

        const userRepository = getRepository(User);
        const newUser = userRepository.create({ name, email, password, phone, address });
        const savedUser = await userRepository.save(newUser);

        res.status(201).json(savedUser);
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Hiányzó adatok!" });
        }

        const userRepository = getRepository(User);
        const user = await userRepository.findOne({ where: { email } });

        if (!user || user.password !== password) { // Replace with hashed password comparison
            return res.status(401).json({ message: "Hibás bejelentkezési adatok!" });
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const getAllUsers = async (req, res, next) => {
    try {
        const userRepository = getRepository(User);
        const users = await userRepository.find();

        res.status(200).json({ success: true, results: users });
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const userRepository = getRepository(User);
        const user = await userRepository.findOne(userId);

        if (!user) {
            return res.status(404).json({ message: "Felhasználó nem található!" });
        }

        res.status(200).json({ success: true, results: user });
    } catch (error) {
        next(error);
    }
};

export const getLoggedUserProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const userRepository = getRepository(User);
        const user = await userRepository.findOne(userId);

        if (!user) {
            return res.status(404).json({ message: "Felhasználó nem található!" });
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const updates = req.body;

        const userRepository = getRepository(User);
        let user = await userRepository.findOne(userId);

        if (!user) {
            return res.status(404).json({ message: "Felhasználó nem található!" });
        }

        userRepository.merge(user, updates);
        const updatedUser = await userRepository.save(user);

        res.status(200).json({ message: "Felhasználó sikeresen frissítve!", user: updatedUser });
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const userRepository = getRepository(User);
        const user = await userRepository.findOne(userId);

        if (!user) {
            return res.status(404).json({ message: "Felhasználó nem található!" });
        }

        await userRepository.remove(user);
        res.status(200).json({ message: "Felhasználó sikeresen törölve!" });
    } catch (error) {
        next(error);
    }
};
