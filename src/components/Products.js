import React, { useEffect, useState } from "react";
import EditButton from "./EditButton";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4000/api");
        const data = await response.json();
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Link to="/products/add">ADD PRODUCTS</Link>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={`${product.name}${product.price}`}>
              Title: {product.name} <br />
              Price: {product.price} <br />
              Last Bidder: {product.last_bidder || "None"} <br />
              Creator: {product.owner} <br />
              <EditButton product={product} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Products;
