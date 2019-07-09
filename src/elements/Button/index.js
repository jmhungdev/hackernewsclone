import React from 'react';
import { button } from './styles.scss';


function Button({ children, ...rest }) {
  return (
    <button className={button} {...rest}>
      {children}
    </button>
  );

}


export default Button;
