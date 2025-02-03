import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { loginUser, registerUser } from "../services/UserService";

export const register = async (req, res, next) => {
    try {
        const { name, email, password, phone, address } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Hiányzó adatok!" });
        }
        res.status(201).json(await registerUser(name, email, password, phone, address));
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

        res.status(200).json(await loginUser(email, password));
    } catch (error) {
        next(error);
    }
};

export const getAllUsers = async (req, res, next) => {
    try {
        const userRepository = await AppDataSource.getRepository(User);
        const users = await userRepository.find();

        res.status(200).json({ success: true, results: users });
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const userRepository = await AppDataSource.getRepository(User);
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
        const userRepository = await AppDataSource.getRepository(User);
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

        const userRepository = await AppDataSource.getRepository(User);
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
        const userRepository = await AppDataSource.getRepository(User);
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
