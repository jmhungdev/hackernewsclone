import React from 'react';
import { h1, h2, h3 } from './styles.scss';


function HX({ hx, children, ...rest }) {
  const render = {
    h1: (<h1 className={h1} {...rest}>{children}</h1>),
    h2: (<h2 className={h2} {...rest}>{children}</h2>),
    h3: (<h3 className={h3} {...rest}>{children}</h3>)
  };

  return render[hx];
}


export default HX;
