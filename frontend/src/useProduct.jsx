import { useEffect } from "react";
import useStore from "./store/store";

const useProduct = () => {
  const { products, getProduct } = useStore();

  useEffect(() => {
    const abortController = new AbortController();

    getProduct(abortController.signal);

    return () => abortController.abort();
  }, []);

  return products;
};

export default useProduct;
