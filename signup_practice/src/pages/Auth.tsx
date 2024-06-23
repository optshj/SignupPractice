import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as baseActions from '../redux/modules/base';
import { AuthWrapper,Login,Register } from '../components/Auth';
import { Routes, Route } from 'react-router-dom';


export default function Auth(){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(baseActions.setHeaderVisibility(false));

        return () => {
            dispatch(baseActions.setHeaderVisibility(true));
        };
    }, [dispatch]);

    return (
        <AuthWrapper>
            <Routes>
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
            </Routes>
        </AuthWrapper>
    );
};