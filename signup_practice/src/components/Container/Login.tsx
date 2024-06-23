import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeInput, initializeForm, localLogin } from '../../redux/modules/auth';
import { setLoggedInfo } from '../../redux/modules/user';
import storage from '../../lib/storage';
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink, AuthError } from '../Auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {form,error,loggedInfo} = useSelector((state: any) => ({
        form:state.auth.getIn(['login', 'form']),
        error:state.auth.getIn(['login', 'error']),
        loggedInfo:state.user.get('loggedInfo').toJS()
    }));

    useEffect(() => {
        return () => {
            dispatch(initializeForm('login'));
        };
    }, [dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(changeInput({
            name,
            value,
            form: 'login'
        }));
    };

    const handleLocalLogin = async () => {
        const { email, password } = form.toJS();

        try {
            await dispatch(localLogin({ email, password }));
            dispatch(setLoggedInfo(loggedInfo));
            navigate('/');
            storage.set('loggedInfo', loggedInfo);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <AuthContent title="로그인">
            <InputWithLabel 
                label="이메일" 
                name="email" 
                placeholder="이메일" 
                value={form.get('email')} 
                onChange={handleChange}
            />
            <InputWithLabel 
                label="비밀번호" 
                name="password" 
                placeholder="비밀번호" 
                type="password" 
                value={form.get('password')} 
                onChange={handleChange}
            />
            {error && <AuthError>{error}</AuthError>}
            <AuthButton onClick={handleLocalLogin}>로그인</AuthButton>
            <RightAlignedLink to="/auth/register">회원가입</RightAlignedLink>
        </AuthContent>
    );
}