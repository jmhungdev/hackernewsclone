import React from 'react';
import { row1, th } from './styles.css';

function DomainHeader () {
    return (
        <tr className={ row1 }>
            <th className={ th }></th>
            <th className={ th }>Domain</th>
            <th className={ th }>Score</th>
            <th className={ th }># Posts</th>
        </tr>
    )
}

export default DomainHeader;