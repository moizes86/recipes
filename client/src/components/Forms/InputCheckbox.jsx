import React from "react";
import "../../styles/styles.scss";

const InputCheckbox = ({ name, items, handleCheck, itemsSelected = [], title }) => {
  return (
    <div className="input-checkbox  ml-1 ">
      <div id="checkbox-group" className="font-bolder">
        {title}
      </div>
      <div role="group" aria-labelledby="checkbox-group">
        {items.map((item, i) => (
          <label className="mr-3 mt-2 " key={`${item.title}-${i}`}>
            <input
              className="mr-2"
              type="checkbox"
              name={name ?? item.title}
              value={item.title}
              id={item.id}
              onChange={handleCheck}
              checked={itemsSelected.map(item=>item.title).includes(item.title)}
            />
            {item.title}
          </label>
        ))}
      </div>
    </div>
  );
};

export default InputCheckbox;
