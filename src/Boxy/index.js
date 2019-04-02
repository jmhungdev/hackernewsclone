import React from 'react';

import { smallSquare, bigSquare } from './styles.css';


function Boxy() {
  return (
    <>
    <div className={smallSquare}>small square</div>
    <div className={bigSquare}>big square</div>
    <footer className="globalColor">footer</footer>
    </>
  );
}


export default Boxy;
