import React from "react";
import "./input-checkbox.scss";

const InputCheckbox = ({ name, items, handleSelect, itemsSelected = [], title }) => {
  return (
    <div className="input-checkbox  ml-1 ">
      <div id="checkbox-group" className="font-bolder">
        {title}
      </div>
      <div role="group" aria-labelledby="checkbox-group">
        {items.map((item, i) => (
          <label className="mr-3 mt-2 " key={`${item}-${i}`}>
            <input
              className="mr-2"
              type="checkbox"
              name={name ?? item}
              value={item}
              onChange={handleSelect}
              checked={itemsSelected.includes(item)}
            />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
};

export default InputCheckbox;
