import { Product } from "../entities/Product";
import { User } from "../entities/User";
import { addOrder, deleteOrder, getOrderByUser } from "../services/OrderServices";
import { getProductById } from "../services/ProductService";
import { getUserById } from "../services/UserService";
const { getRepository } = require("typeorm");
const Hosting = require("../entities/Order");

export const newHosting = async (req, res, next) => {
    try {
        const { domainname, password, userId, productId } = req.body;
        if (!password || !domainname || !userId || !productId) {
            return res.status(400).json({ message: "Hiányzó adatok!" });
        }
        const user:User = await getUserById(userId)
        const product:Product = await getProductById(productId)
        const pass = await addOrder(product, user, domainname, password )
        res.status(201).json(pass);
    } catch (error) {
        next(error);
    }
};

export const getAll = async (req, res, next) => {
    try {
        const hostingRepository = getRepository(Hosting);
        const users = await hostingRepository.find();

        res.status(200).json({ success: true, results: users });
    } catch (error) {
        next(error);
    }
};

export const getH = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user:User =  await getUserById(userId)
        const host = await getOrderByUser(user);

        if (!host) {
            return res.status(404).json({ message: "Felhasználó nem található!" });
        }

        res.status(200).json({ success: true, results: host });
    } catch (error) {
        next(error);
    }
};

export const updateH = async (req, res, next) => {
    try {
        const hostId = req.params.id;
        const updates = req.body;

        const hostingRepository = getRepository(Hosting);
        let host = await hostingRepository.findOne(hostId);

        if (!host) {
            return res.status(404).json({ message: "Felhasználó nem található!" });
        }

        hostingRepository.merge(host, updates);
        const updatedHost = await hostingRepository.save(host);

        res.status(200).json({ message: "Felhasználó sikeresen frissítve!", host: updatedHost });
    } catch (error) {
        next(error);
    }
};

export const deleteH = async (req, res, next) => {
    try {
        const hostId = req.params.id;
        const host = await deleteOrder(hostId);

        if (!host) {
            return res.status(404).json({ message: "Felhasználó nem található!" });
        }

        res.status(200).json({ message: "Felhasználó sikeresen törölve!" });
    } catch (error) {
        next(error);
    }
};
