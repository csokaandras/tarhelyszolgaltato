import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../services/ProductService";

export const addP = async (req, res, next) => {
    try {
        const { name, category, price, description } = req.body;
        if (!name || !category || !price || !description) {
            return res.status(400).json({ message: "Hiányzó adatok!" });
        }
        res.status(201).json(await addProduct(name, category, price, description));
    } catch (error) {
        next(error);
    }
};

export const getAll = async (req, res, next) => {
    try {
        res.status(200).json(await getAllProducts());
    } catch (error) {
        next(error);
    }
};

export const getP = async (req, res, next) => {
    try {
        const product = await getProductById(req.params.id)

        if (!product) {
            return res.status(404).json({ message: "Termék nem található!" });
        }

        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

export const updateP = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const updates = req.body;

        let product = await updateProduct(productId, updates)

        if (!product) {
            return res.status(404).json({ message: "Termék nem található!" });
        }

        res.status(200).json({ message: "Termék sikeresen frissítve!", product: product });
    } catch (error) {
        next(error);
    }
};

export const deleteP = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await deleteProduct(productId)
        
        if (!product) {
            return res.status(404).json({ message: "Termék nem található!" });
        }

        res.status(200).json({ message: "Termék sikeresen törölve!" });
    } catch (error) {
        next(error);
    }
};
