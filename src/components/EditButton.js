import React from "react";
import { useNavigate } from "react-router-dom";

const EditButton = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/bid/${product.name}/${product.price}`);
  };

  return <button onClick={handleClick}>Edit</button>;
};

export default EditButton;
