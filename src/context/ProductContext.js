import React, { createContext, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
//
const ProductContext = createContext();

const ENDPOINT = "http://localhost:4000";

function ProductContextProvider({ children }) {
  //
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  //
  useEffect(() => {
    // Fetch data from the backend when the component mounts

    // Connect to the socket server
    const socket = socketIOClient(ENDPOINT);
    //
    // Listen for custom events indicating new user connections
    socket.on("userConnected", (newUserId) => {
      setUsers((prevUsers) => [...prevUsers, newUserId]);
    });
    //
    // Listen for custom events indicating user disconnections
    socket.on("userDisconnected", (disconnectedUserId) => {
      setUsers((prevUsers) =>
        prevUsers.filter((userId) => userId !== disconnectedUserId)
      );
    });
    // realtime, show to other connected user that, updated product list (data)
    socket.on("newProductAdded", (newProduct) => {
      // Update the state with the new product
      setData((prevData) => [...prevData, newProduct]);
    });
    //
    // fetchData();
    //
    // Cleanup the socket connection on component unmount
    return () => socket.disconnect();
    //
  }, []);

  //
  const fetchData = async () => {
    try {
      // Make a GET request to your backend API
      const response = await fetch(`${ENDPOINT}/product`);

      // Parse the response as JSON
      const jsonData = await response.json();

      //  setData(jsonData.products);
      setData(jsonData);

      console.log("fetchData called");

      //
      // Log the updated state in a useEffect hook
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  //
  //
  return (
    <ProductContext.Provider value={{ ENDPOINT, data, fetchData }}>
      {children}
    </ProductContext.Provider>
  );
}

export { ProductContext, ProductContextProvider };
