import { randomBytes } from "crypto";
import { AppDataSource } from "../config/data-source";
const { getRepository } = require("typeorm");
const Hosting = require("../entities/Hosting");

function generatePassword() {
    return randomBytes(8).toString("hex");
}

export const newHosting = async (req, res, next) => {
    try {
        const { name, category, price, description } = req.body;
        if (!name || !price || !category || !description) {
            return res.status(400).json({ message: "Hiányzó adatok!" });
        }

        try {
            await AppDataSource.query(`CREATE DATABASE \`${name}\``);
            res.status(200).json({ message: "Database created successfully!" });

            const password = "fasz";

            try {
                await AppDataSource.query(`CREATE USER '${name}'@'localhost' IDENTIFIED BY '${password}'`);
                res.status(200).json({ message: "User created successfully!", password });

                try {
                    await AppDataSource.query(`GRANT ${privileges} ON \`${name}\`.* TO '${name}'@'localhost'`);
                    res.status(200).json({ message: `Granted ${privileges} to ${name} on ${name}!` });
                } catch (err) {
                    res.status(500).json({ message: err.message });
                }

            } catch (err) {
                next(err)
            }   

        } catch (err) {
            next(err)
        }

        const hostRepository = getRepository(Hosting);
        const newHost = hostRepository.create({ name, category, description, price });
        const savedHost = await hostRepository.save(newHost);

        res.status(201).json(savedHost);
    } catch (error) {
        next(error);
    }
};

export const getAllHosts = async (req, res, next) => {
    try {
        const hostingRepository = getRepository(Hosting);
        const users = await hostingRepository.find();

        res.status(200).json({ success: true, results: users });
    } catch (error) {
        next(error);
    }
};

export const getHostById = async (req, res, next) => {
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

export const updateHost = async (req, res, next) => {
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

export const deleteHost = async (req, res, next) => {
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
