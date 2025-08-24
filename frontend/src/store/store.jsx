import { create } from "zustand";
import ProductService from "../services/ProductService";

const message = (success, message) => ({
  success,
  message,
});

const modifyProduct = (id, products, newProduct) => {
  const updatedProduct = [];
  for (let i = 0; i < products.length; i++) {
    if (id === products[i]._id) {
      if (newProduct) {
        updatedProduct.push(newProduct);
      } else {
        continue;
      }
    } else {
      updatedProduct.push(products[i]);
    }
  }
  return updatedProduct;
};

const useStore = create((set) => ({
  products: [],
  getProduct: async (signal) => {
    const response = await ProductService.getProduct(signal);

    try {
      const result = await response.json();
      if (result.success) {
        set({ products: result.data });
      }
    } catch (error) {
      console.log(error);
      return message(false, "Server issue");
    }

  },
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return message(false, "Kindly fill all the details.");
    }
    try {
      const response = await ProductService.createProduct(newProduct);
      const data = await response.json();
      if (!data.success)
        return message(false, "Product not created, try again.");
      set((state) => ({ products: [...state.products, data.data] }));
      return message(true, "Product created successfully");
    } catch (error) {
      console.log(error);
      return message(false, "Server issue");
    }
  },
  updateProduct: async (product) => {
    try {
      const response = await ProductService.updateProduct(product);
      const data = await response.json();
      if (!data.success)
        return message(false, "Product is not updated , try again");
      set((state) => ({
        products: modifyProduct(product._id, state.products, data.data),
      }));

      return message(true, "Product updated successfully");
    } catch (error) {
      console.log(error);
      return message(false, "Server issue");
    }
  },
  deleteProduct: async (id) => {
    try {
      const response = await ProductService.deleteProduct(id);
      const data = await response.json();
      if (!data.success)
        return message(false, "Product is not updated , try again");
      set((state) => ({ products: modifyProduct(id, state.products) }));

      return message(true, "Product deleted successfully");
    } catch (error) {
      console.log(error);
      return message(false, "Server issue");
    }
  },
}));

export default useStore;
