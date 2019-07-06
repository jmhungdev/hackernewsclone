import React from 'react';
import { h1, h2, h3 } from './styles.scss';


function HX({ hx, children, style }) {
  const render = {
    h1: (<h1 className={h1} style={style}>{children}</h1>),
    h2: (<h2 className={h2} style={style}>{children}</h2>),
    h3: (<h3 className={h3} style={style}>{children}</h3>)
  };

  return render[hx];
}


export default HX;
