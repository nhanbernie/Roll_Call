/* eslint-disable react/prop-types */
import { useState } from "react";
import "../styles/CheckBox.scss";

const CheckBox = ({ onStatusChange }) => {
  const [isActive, setIsActive] = useState(false);

  const handleCheckboxChange = () => {
    const newStatus = !isActive;
    setIsActive(newStatus);
    onStatusChange(newStatus); 
  };

  return (
    <div className="checkbox-wrapper-42">
      <input
        id="cbx-42"
        type="checkbox"
        checked={isActive}
        onChange={handleCheckboxChange}
      />
      <label className="cbx" htmlFor="cbx-42"></label>
      <label
        className={`lbl ${isActive ? 'Active' : 'Inactive'}`}
        htmlFor="cbx-42"
      >
        {isActive ? 'Active' : 'Inactive'}
      </label>
    </div>
  );
};

export default CheckBox;
