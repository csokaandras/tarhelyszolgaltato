import { AppDataSource } from "../config/data-source";
import { Product } from "../entities/Product";
 
const productRepository = AppDataSource.getRepository(Product);
 
export const addProduct = async (name: string, category: string, price: number, description: string) => {
    const product = productRepository.create({ name, category, price, description });
    return await productRepository.save(product);
};
 
export const getAllProducts = async () => {
    return await productRepository.find({ select: ["id", "name", "category", "description", "price"] });
};
 
export const getProductById = async (id: string) => {
    return await productRepository.findOne({ where: { id }, select: ["id", "name", "category", "description", "price"] });
};
 
export const updateProduct = async (id: string, updates: Partial<Product>) => {
    const product = await productRepository.findOne({ where: { id } });
    if (!product) return null;
    Object.assign(product, updates);
    return await productRepository.save(product);
};
 
export const deleteProduct = async (id: string) => {
    const product = await productRepository.findOne({ where: { id } });
    if (!product) return null;
    await productRepository.remove(product);
    return true;
};