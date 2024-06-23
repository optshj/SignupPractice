import Header, { LoginButton } from '../Header';
import { useSelector } from 'react-redux';

export default function HeaderContainer(){
    const visible = useSelector((state: any) => state.base.getIn(['header', 'visible']));

    if (!visible) return null;

    return (
        <Header>
            <LoginButton/>
        </Header>
    );
};