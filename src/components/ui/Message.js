import React from 'react'

import styled from 'styled-components'
import messageMap from 'state/messageMap'

const StyledDiv = styled('div')`
    font-size: 1em;
    width: ${props => props.width};
    color: ${props => props.color};
`;

const Message = ({ stateKey, ...props }) => (
    <StyledDiv {...props}>{ messageMap(stateKey) }</StyledDiv>
);

export default Message