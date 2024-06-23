import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
    margin-top: 1rem;
    text-align: right;
`;

const StyledLink = styled(Link)`
    color: ${oc.gray[6]};
    &:hover {
        color: ${oc.gray[7]};
    }
`

export default function RightAlignedLink({to, children}:{to:string, children:React.ReactNode}){
    return(
        <Wrapper>
            <StyledLink to={to}>
                {children}
                </StyledLink>
        </Wrapper>
    )
}