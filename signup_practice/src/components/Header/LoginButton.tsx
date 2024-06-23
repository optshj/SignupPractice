import styled from 'styled-components';
import { Link } from 'react-router-dom';
import oc from 'open-color';
import { shadow } from '../../styles/styleUtils';

const Wrapper = styled(Link)`
    font-weight: 600;
    color: ${oc.cyan[6]};
    border: 1px solid ${oc.cyan[6]};
    padding: 0.5rem;
    padding-bottom: 0.4rem;
    cursor: pointer;
    border-radius: 2px;
    text-decoration: none;
    transition: .2s all;
    white-space: nowrap;

    &:hover {
        background: ${oc.cyan[6]};
        color: white;
        ${shadow(1)}
    }

    &:active {
        transform: translateY(3px);
    }
`;

export default function LoginButton(){
    return(
        <Wrapper to="/auth/login">
            로그인 / 가입
        </Wrapper>
    )
}