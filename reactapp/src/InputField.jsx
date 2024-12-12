import React from 'react';

const InputField = ({ label, type, id, value, onChange, required }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default InputField;
