import React from 'react';
import { contentGrid } from './styles.css';


function ContentGrid({ children }) {
  return (
    <div className={contentGrid}>
      {children}
    </div>
  );
}


export default ContentGrid;
