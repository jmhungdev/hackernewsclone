import React from 'react';


function Row({ domain }) {
  const { url, score, numPosts } = domain;

  return (
    <tr>
      <td>{1}. </td>
      <td>{url}</td>
      <td>{score}</td>
      <td>{numPosts}</td>
    </tr>
  );
}


export default Row;
