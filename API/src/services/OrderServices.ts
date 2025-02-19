import { AppDataSource } from "../config/data-source";
import { Order } from "../entities/Order";
import { Product } from "../entities/Product";
import { User } from "../entities/User";
 
const orderRepository = AppDataSource.getRepository(Order);
 
export const addOrder = async (product: Product, user: User, domainname: string, password: string) => {
    const order = orderRepository.create({ product, user, domainname, password });
    return await orderRepository.save(order);
};
 
export const getAllOrder = async () => {
    return await orderRepository.find({ select: ["id", "user", "product", "domainname", "date"] });
};

export const getOrderByUser = async (user: User) => {
    return await orderRepository.findOne({ where: { user }, select: ["id", "user", "product", "domainname", "date"] });
};

export const deleteOrder = async (id: string) => {
    const order = await orderRepository.findOne({ where: { id } });
    if (!order) return null;
    await orderRepository.remove(order);
    return true;
};
