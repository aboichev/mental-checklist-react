import React from 'react'

import styled from 'styled-components'

const StyledOl = styled('ol')`

    list-style: none;
    counter-reset: item;
    text-align: left;

    li {
        counter-increment: item;
        margin-bottom: 5px;
    }
    li:before {
        margin-right: 10px;
        content: counter(item);
        background: ${props => props.bulletColor || 'green'};
        border-radius: 100%;
        color: white;
        width: ${props => props.width || '1.2em'};
        text-align: center;
        display: inline-block;
    }
`;

const ResponseList = ({ data, ...props }) => (
    <StyledOl {...props}>
    { (data || []).map(x => {
        return <li key={x.san}>{x.san}</li>;
      })
    }
    </StyledOl>
);

export default ResponseList