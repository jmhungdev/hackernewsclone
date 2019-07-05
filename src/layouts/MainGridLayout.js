import React from 'react';
import { mainGridLayout } from './styles.css';


function MainGridLayout({ children }) {
  return (
    <div className={mainGridLayout}>
      {children}
    </div>
  );
}


export default MainGridLayout;
