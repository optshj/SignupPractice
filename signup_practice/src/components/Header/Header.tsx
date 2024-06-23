import React from "react";
import styled from "styled-components";
import oc from "open-color";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0px;
    width: 100%;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
`
const Background = styled.div`
    background: white;
    display: flex;
    justify-content: center;
    height: auto;
`
const HeaderContents = styled.div`
    width: 1200px;
    height: 55px;
    display: flex;
    flex-direction: row;
    align-items: center;

    padding-right: 1rem;
    padding-left: 1rem;
    ${({theme}) => theme.media.large`
        width: 992px;
    `}
    ${({theme}) => theme.media.medium`
        width: 100%;
    `}
`
const Logo = styled.div`
    font-size: 1.4rem;
    letter-spacing: 2px;
    color: ${oc.teal[7]};
    font-family: 'Rajdhani';
`
const Spacer = styled.div`
    flex-grow: 1;
`
const GradientBorder = styled.div`
    height: 3px;
    background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});
`

export default function Header({children}: {children: React.ReactNode}){
    return (
        <Wrapper>
            <Background>
                <HeaderContents>
                    <Logo>HERB</Logo>
                    <Spacer/>
                    {children}
                </HeaderContents>
            </Background>
            <GradientBorder/>
        </Wrapper>
    );
};