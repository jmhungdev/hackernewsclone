import React from 'react';
import { navGrid } from './styles.css';


function NavGrid({ children }) {
  return (
    <div className={navGrid}>
      {children}
    </div>
  );
}


export default NavGrid;
