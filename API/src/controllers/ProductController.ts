import { AppDataSource } from "../config/data-source";
import { Product } from "../entities/Hosting";



export const getAllProduct = async (req, res, next) => {
    try {
        const userRepository = await AppDataSource.getRepository(Product);
        const users = await userRepository.find();

        res.status(200).json({ success: true, results: users });
    } catch (error) {
        next(error);
    }
};