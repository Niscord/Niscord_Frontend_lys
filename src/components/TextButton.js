import React from 'react';
import styled from 'styled-components';

const NonBoxButton = styled.button`
  display: inline-flex;
  align-items: center;
  outline: none;
  border: none;
  color: black;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  
  height: 1rem;
  font-size: ${props => props.fontSize};
  text-align: center;
`;

const TextButton = ({ children, ...rest }) => {
    return <NonBoxButton>{children}</NonBoxButton>
}

export default TextButton;