import React, { useState, useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const AddProduct = () => {
  const { ENDPOINT, fetchData } = useContext(ProductContext);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    owner: "",
    last_bidder: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${ENDPOINT}/product/add-product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        // Product added successfully, fetch updated data
        fetchData();
        // Reset form
        setNewProduct({
          name: "",
          price: "",
          owner: "",
          last_bidder: "",
        });
      } else {
        console.error("Error adding product:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="text"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Owner:
          <input
            type="text"
            name="owner"
            value={newProduct.owner}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Last Bidder:
          <input
            type="text"
            name="last_bidder"
            value={newProduct.last_bidder}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
