import { FindRelationsNotFoundError, QueryRunner } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Order } from "../entities/Order";
import { Product } from "../entities/Product";
import { User } from "../entities/User";
 
const orderRepository = AppDataSource.getRepository(Order);
 
export const addOrder = async (product: Product, user: User, domainname: string) => {
    const order = orderRepository.create({ product, user, domainname });
    return await orderRepository.save(order);
};
 
export const getAllOrder = async () => {
    return await orderRepository.find({ select: ["id", "user", "product", "domainname", "date"] });
};

export const getOrderById = async (id: string) => {
    return await orderRepository.findOne({ where: { id }, select: ["id", "user", "product", "domainname", "date"] });
};

export const deleteOrder = async (id: string) => {
    const order = await orderRepository.findOne({ where: { id } });
    if (!order) return null;
    await orderRepository.remove(order);
    return true;
};

export const createHost = async (domainname: string, privileges: string) => {
    const queryRunner: QueryRunner = AppDataSource.createQueryRunner();
    const password = Math.random().toString(36).slice(-10);
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const sql = `CREATE USER '${domainname}'@'localhost' IDENTIFIED BY '${password}'`;
        await queryRunner.query(sql);
        await queryRunner.query(`CREATE DATABASE \`${domainname}\``);
        
        await queryRunner.query(`GRANT ${privileges} ON \`${domainname}\`.* TO '${domainname}'@'localhost'`);

        return password;
    } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
    } finally{
        await queryRunner.release();
    }
}