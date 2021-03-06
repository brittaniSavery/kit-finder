import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import "./App.css";

function App() {
  const [selected, setSelected] = useState(null);

  const loadKits = (value) => {
    return fetch(`/search?filter=${value}`).then((res) => res.json());
  };

  const handleSelectedChange = (value) => {
    setSelected(value);
  };

  return (
    <div className="container">
      <h1>Kit Finder</h1>
      <p>Enter the shipping tracking code:</p>
      <div className="search">
        <AsyncSelect
          autoFocus
          cacheOptions
          defaultOptions
          isClearable
          escapeClearsValue
          loadOptions={loadKits}
          getOptionLabel={(obj) => obj.shipping_tracking_code}
          getOptionValue={(obj) => obj.shipping_tracking_code}
          onChange={handleSelectedChange}
        />
        {selected && (
          <div className="selected">
            <b>ID:</b> {selected.id}
            <br />
            <b>Label ID:</b> {selected.label_id}
            <br />
            <b>Shipping Tracking Code:</b> {selected.shipping_tracking_code}
            <br />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
