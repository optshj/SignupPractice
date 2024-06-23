import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, Auth } from './pages';
import HeaderContainer from './components/Container/HeaderContainer';
import storage from './lib/storage';
import { useDispatch } from 'react-redux';
import * as userActions from './redux/modules/user';
import { bindActionCreators } from 'redux';

export default function App() {
    const dispatch = useDispatch();

    const initializeUserInfo = async () => {
        const loggedInfo = storage.get('loggedInfo'); // 로그인 정보를 로컬스토리지에서 가져옵니다.
        if (!loggedInfo) return; // 로그인 정보가 없다면 여기서 멈춥니다.

        const UserActions = bindActionCreators(userActions, dispatch);
        UserActions.setLoggedInfo(loggedInfo);
        try {
            await UserActions.checkStatus();
        } catch (e) {
            storage.remove('loggedInfo');
            window.location.href = '/auth/login?expired';
        }
    };

    useEffect(() => {
        initializeUserInfo();
    }, []);

    return (
        <>
            <HeaderContainer />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth/*" element={<Auth />} />
            </Routes>
        </>
    );
}