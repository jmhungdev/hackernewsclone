import React from 'react';
import { container, box } from './styles.css';


const Search = ({ title = 'Search' }) => (
  <div className={container}>
    <span className={box}>
      <svg viewBox="0 0 30 30">
        <title>{title}</title>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <circle stroke="#ffffff" strokeWidth="2" cx="10" cy="10" r="9" />
          <path d="M16.6135413,18.1789581 L21.7364766,18.1789581 C22.8341425,18.1789581 23.7239766,19.0687921 23.7239766,20.1664581 L23.7239766,20.1664581 C23.7239766,21.2641241 22.8341425,22.1539581 21.7364766,22.1539581 L16.6135413,22.1539581 L16.6135413,18.1789581 Z" fill="#ffffff" transform="translate(20.168759, 20.166458) rotate(45.000000) translate(-20.168759, -20.166458) " />
        </g>
      </svg>
    </span>
  </div>
);


export default Search;
