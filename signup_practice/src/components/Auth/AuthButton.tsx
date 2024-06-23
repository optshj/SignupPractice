import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from '../../styles/styleUtils';

const Wrapper = styled.div`
    margin-top: 1rem;
    padding-top: 0.6rem;
    padding-bottom: 0.5rem;
    background: ${oc.teal[6]};
    color: white;
    text-align: center;
    font-size: 1.25rem;
    font-weight: 500;
    user-select: none;
    transition: .2s all;
    cursor: pointer;

    &:hover {
        background: ${oc.teal[5]};
        ${shadow(0)}
    }
    &:active {
        background: ${oc.teal[7]};
    }
`;

export default function AuthButton({children,onClick}:{children:React.ReactNode,onClick:()=>void}){
    return(
        <Wrapper onClick={onClick}>
            {children}
        </Wrapper>
    )
}