import React from 'react';
import { Field, ErrorMessage } from 'formik';
import './InputFieldStyle.css';

const InputField = ({ label, name, type, fileName, ...rest }) => {
  const inputProps = {
    type,
    id: name,
    name,
    ...(type === 'file' && fileName ? { value: fileName } : {}),
    accept: type === 'file' ? 'image/*' : undefined, 
    ...rest,

  };

  return (
    <div className='input-field'>
      <label htmlFor={name}>{label}</label>
      {type === 'file' && fileName ? (
        <div>
          <span>{fileName}</span>
          <input type="hidden" name={name} value={fileName}  />
        </div>
      ) : (
        <Field {...inputProps} />
      )}
      <ErrorMessage name={name} component="div" style={{ color: 'red' }} />
    </div>
  );
};

export default InputField;
