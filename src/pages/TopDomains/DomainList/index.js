import React from 'react';
import { row, td } from './styles.css';

function DomainList({ domains }) {
  return (
    <>
      { domains.map((domain, index) => (
        <tr key={ domain.url } className={ row }>
            <td className={ td }>{ index + 1 }. </td>
            <td className={ td }>{ domain.url }</td>
            <td className={ td }>{ domain.score }</td>  
            <td className={ td }>{ domain.numPosts }</td>
        </tr> ))}
    </>
  );
}


export default DomainList;
