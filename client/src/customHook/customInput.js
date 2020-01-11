import React, { useState } from 'react';

const customInput = (initialValue='')=>{
  const [state,setState] = useState(initialValue);
  const changeInput=(value)=>{
    setState(value);
  }
  return [state,changeInput]
}

export default customInput;