import React, { useState } from "react";
import axios from "axios";
import "./OrderForm.css"; // Import the CSS file

const itemsList = [
  { id: "101", name: "Laptop" },
  { id: "102", name: "Phone" },
  { id: "103", name: "Headphones" },
  { id: "104", name: "Monitor" },
  { id: "105", name: "Keyboard" },
];

const OrderForm = () => {
  const [orderData, setOrderData] = useState({
    customerName: "",
    item: "",
    quantity: 1,
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!orderData.customerName || !orderData.item || orderData.quantity < 1) {
      setStatus("⚠️ Please fill in all fields.");
      return;
    }
  
    const requestBody = {
      item_id: orderData.item,
      quantity: parseInt(orderData.quantity, 10), // Ensure it's a number
      customer: orderData.customerName,
    };
  
    console.log("🚀 Sending request:", requestBody); // Debug log
  
    setLoading(true);
    try {
      const response = await axios.post(
        "https://naa9kn834b.execute-api.us-east-1.amazonaws.com/Prod/orders",
        requestBody, // No need for JSON.stringify in Axios
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("✅ Order Response:", response.data);
      setStatus("✅ Order placed successfully!");
    } catch (error) {
      console.error("❌ Order Error:", error.response ? error.response.data : error.message);
      setStatus("❌ Failed to place order. Try again.");
    }
    setLoading(false);
  };  
  

  return (
    <div className="order-form-container">
      <div className="order-form">
        <h2 className="title">📦 Place Your Order</h2>

        <form onSubmit={handleSubmit}>
          {/* Customer Name */}
          <div className="form-group">
            <label>Customer Name</label>
            <input
              type="text"
              placeholder="Enter Customer Name"
              value={orderData.customerName}
              onChange={(e) => setOrderData({ ...orderData, customerName: e.target.value })}
            />
          </div>

          {/* Item Selection */}
          <div className="form-group">
            <label>Select an Item</label>
            <select
              value={orderData.item}
              onChange={(e) => setOrderData({ ...orderData, item: e.target.value })}
            >
              <option value="">-- Choose an Item --</option>
              {itemsList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} (ID: {item.id})
                </option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              min="1"
              placeholder="Enter Quantity"
              value={orderData.quantity}
              onChange={(e) => setOrderData({ ...orderData, quantity: e.target.value })}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className={loading ? "button disabled" : "button"} disabled={loading}>
            {loading ? "Placing Order..." : "📨 Place Order"}
          </button>
        </form>

        {/* Status Message */}
        {status && <p className="status-message">{status}</p>}
      </div>
    </div>
  );
};

export default OrderForm;
