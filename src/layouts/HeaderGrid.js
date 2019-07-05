import React from 'react';
import { headerGrid } from './styles.css';


function HeaderGrid({ children }) {
  return (
    <div className={headerGrid}>
      {children}
    </div>
  );
}


export default HeaderGrid;
