import React from 'react';
import { button } from './styles.scss';


function Button({ children, style }) {
  return (
    <button className={button}
      style={style}>
      {children}
    </button>
  );

}


export default Button;
