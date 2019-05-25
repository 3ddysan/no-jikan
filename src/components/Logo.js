import React from 'react'
import styled from 'styled-components'

const Title = styled.h1`
    width: 75px;
    background-color: lightcoral;
    padding-left: 2px;
    box-shadow: 0px 0px 1px 5px rgba(0,0,0,1);

    span {
        background-color: white;
    }

    transition: all 0.3s ease-in-out 0s;

    &:hover {
        cursor: pointer;
        transform: rotate(8deg);
        transition: all 0.3s ease-in-out 0s;
    }
`

const Logo = () => (
    <div className="container">
        <Title className="title">no<span>-</span>jikan</Title>
    </div>
);

export default Logo;