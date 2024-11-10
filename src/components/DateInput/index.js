import React, { useState } from 'react'

export default function DateInput() {
    const [value, setValue] = useState('');

  const formatDate = (value) => {
    const dateParts = value.split('/');
    if (dateParts.length === 3) {
      const day = dateParts[0].padStart(2, '0');
      const month = dateParts[1].padStart(2, '0');
      const year = dateParts[2];
      return `${day}/${month}/${year}`;
    }
    return value;
  };

  const handleBlur = () => {
    setValue(formatDate(value));
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <input
      type="date"
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder="dd/mm/yyyy"
    />
  )
}
