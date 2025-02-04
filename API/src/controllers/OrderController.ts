import { createHost } from "../services/OrderServices";
const { getRepository } = require("typeorm");
const Hosting = require("../entities/Order");

export const newHosting = async (req, res, next) => {
    try {
        const { privileges, domainname } = req.body;
        if (!privileges || !domainname) {
            return res.status(400).json({ message: "Hiányzó adatok!" });
        }
        const pass = await createHost(domainname, privileges)
        console.log(pass)
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
        const hostId = req.params.id;
        const hostingRepository = getRepository(Hosting);
        const host = await hostingRepository.findOne(hostId);

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
        const hostingRepository = getRepository(Hosting);
        const host = await hostingRepository.findOne(hostId);

        if (!host) {
            return res.status(404).json({ message: "Felhasználó nem található!" });
        }

        await hostingRepository.remove(host);
        res.status(200).json({ message: "Felhasználó sikeresen törölve!" });
    } catch (error) {
        next(error);
    }
};
