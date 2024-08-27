// src/App.js
import React from "react";
import ItemList from "./components/ItemList";
import DataFetcher from "./components/DataFetcher";

function App() {
  return (
    <div className="App">
      <h1>React Assignment</h1>
      <ItemList />
      <DataFetcher />
    </div>
  );
}

export default App;
