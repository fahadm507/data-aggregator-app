import React from 'react';

const  Dropdown = ({ options, name, onChange, label, value }) => {
  return (
    <div>
      <select name={name} value={value} onChange={onChange}>
      <option value=''>{label}</option>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
