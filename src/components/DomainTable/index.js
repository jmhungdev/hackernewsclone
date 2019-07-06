import React from 'react';

import Row from './Row';
import { table, firstRow } from './styles.scss';


function DomainTable({ domains }) {
  return (
    <table className={table}>
      <tbody>
        <tr className={firstRow}>
          <th />
          <th>Domain</th>
          <th>Score</th>
          <th># Posts</th>
          <th>Mean Points</th>
        </tr>
        {domains.map(domain => <Row key={domain.url} domain={domain} />)}
      </tbody>
    </table>
  );
}


export default DomainTable;
