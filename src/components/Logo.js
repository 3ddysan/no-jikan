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
`

const Logo = () => (
    <div className="container">
        <Title className="title">no<span>-</span>jikan</Title>
    </div>
);

export default Logo;