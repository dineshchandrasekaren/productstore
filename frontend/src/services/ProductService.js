class Product {
  constructor() {}

  getProduct = async (signal) => await fetch("/api/getProduct", {
      method: "GET",
      signal
    });

  createProduct = async (product) =>
   await fetch("/api/createProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

  updateProduct = async (product) =>
  await fetch(`/api/updateProduct/${product._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

  deleteProduct = async (id) =>
   await fetch(`/api/deleteProduct/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
}

export default new Product();
