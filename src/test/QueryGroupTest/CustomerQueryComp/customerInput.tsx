import React, { useState } from 'react';
import { Input } from 'antd';

export default ({ value = '', onChange = function(params?: any){}, ...dataEntryProps }) => {
  const [number, setNumber] = useState(0);

  const triggerChange = (changedValue: number) => {
    if (onChange) {
      onChange(changedValue);
    }
  };

  const onNumberChange = (e: any) => {
    const newNumber = parseInt(e.target.value || 0, 10);
    if (Number.isNaN(number)) {
      return;
    }
    
    triggerChange(newNumber);
  };

  return (
    <Input
      type="text"
      value={value || number}
      onChange={onNumberChange}
      style={{ width: 100 }}
      {...dataEntryProps}
    />
  )
}