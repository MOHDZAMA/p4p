// src/ItemList.js
import React, { useState } from "react";
import "../App.css"; // Ensure this import is here

function ItemList() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, newItem]);
      setNewItem("");
    }
  };

  return (
    <div className="item-list">
      <h2>Item List</h2>
      <div className="input-group">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter new item"
        />
        <button onClick={addItem}>Add Item</button>
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <span className="item-number">{index + 1}.</span> {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
