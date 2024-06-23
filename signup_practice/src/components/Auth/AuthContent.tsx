import styled from 'styled-components';
import oc from 'open-color';

const Title = styled.div`
    font-size: 1.5rem;
    font-weight: 500;
    color: ${oc.gray[8]};
    margin-bottom: 1rem;
`;

export default function AuthContent ({title,children}:{title:string,children:React.ReactNode}){
    return(
        <>
            <Title>{title}</Title>
            {children}
        </>
    )
}