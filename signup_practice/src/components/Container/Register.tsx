import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink, AuthError } from '../Auth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import * as authActions from '../../redux/modules/auth';
import * as userActions from '../../redux/modules/user';
import { isEmail, isLength, isAlphanumeric } from 'validator';
import debounce from 'lodash/debounce';
import { AxiosError } from 'axios';
import storage from '../../lib/storage';

export default function Register(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { form, error, exists, result } = useSelector((state:any) => ({
        form: state.auth.getIn(['register', 'form']),
        error: state.auth.getIn(['register', 'error']),
        exists: state.auth.getIn(['register', 'exists']),
        result: state.auth.get('result')
    }));
    useEffect(() => {
        return () => {
            dispatch(authActions.initializeForm('register'));
        };
    }, [dispatch]);

    const [message,setMessage] = useState<string | null>(null);
    const setErrorMessage = (message:string|null) => {
        setMessage(message);
        authActions.setError({
            form: 'register',
            message
        });
    };
    
    type ValidateType = {
        [key: string]: (value: string) => boolean;
    };
    const validate: ValidateType = {
        email: (value: string) => {
            if (!isEmail(value)) {
                setErrorMessage('잘못된 이메일 형식 입니다.');
                return false;
            }
            return true;
        },
        username: (value: string) => {
            if (!isAlphanumeric(value) || !isLength(value, { min: 4, max: 15 })) {
                setErrorMessage('아이디는 4~15 글자의 알파벳 혹은 숫자로 이뤄져야 합니다.');
                return false;
            }
            return true;
        },
        password: (value: string) => {
            if (!isLength(value, { min: 6 })) {
                setErrorMessage('비밀번호를 6자 이상 입력하세요.');
                return false;
            }
            setErrorMessage(null);
            return true;
        },
        passwordConfirm: (value: string) => {
            if (form.get('password') !== value) {
                setErrorMessage('비밀번호가 일치하지 않습니다.');
                return false;
            }
            setErrorMessage(null);
            return true;
        }
    };

    const checkEmailExists = debounce(async (email:string) => {
        try {
            await authActions.checkEmailExists(email);
            if(exists.get('email')) {
                setMessage('이미 존재하는 이메일입니다.');
            } else {
                setMessage(null);
            }
        } catch (e) {
            console.log(e);
        }
    },300);

    const checkUsernameExists = debounce(async (username:string) => {
        try {
            await authActions.checkUsernameExists(username);
            if(exists.get('username')) {
                setMessage('이미 존재하는 아이디입니다.');
            } else {
                setMessage(null);
            }
        } catch (e) {
            console.log(e);
        }
    },300);


    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        dispatch(authActions.changeInput({
            name,
            value,
            form: 'register'
        }));
        const validation = validate[name](value);
        if (name.indexOf('password') > -1 || !validation) return;

        const check = name === 'email' ? checkEmailExists : checkUsernameExists;
        check(value);

    };

    const handleLocalRegister = async () => {
        const { email, username, password, passwordConfirm } = form.toJS();
        if(error) return;
        if(!validate['email'](email) 
            || !validate['username'](username) 
            || !validate['password'](password) 
            || !validate['passwordConfirm'](passwordConfirm)) {
            return;
        }

        try {
            await authActions.localRegister({
                email, username, password
            });
            const loggedInfo = result.toJS();
            
            storage.set('loggedInfo', loggedInfo);
            userActions.setLoggedInfo(loggedInfo);
            userActions.setValidated(true);
            navigate('/');
        } catch(e) {
            const error = e as AxiosError;
            if(error.response && error.response.status === 409) {
                const key = error.response.data;
                const message = key === 'email' ? '이미 존재하는 이메일입니다.' : '이미 존재하는 아이디입니다.';
                setMessage(message);
            } else {
                setMessage('알 수 없는 에러가 발생했습니다.');
            }   
        }
    }
    
    const email = form.get('email');
    const username = form.get('username');
    const password = form.get('password');
    const passwordConfirm = form.get('passwordConfirm');

    return (
        <AuthContent title="회원가입">
            <InputWithLabel 
                label="이메일"
                name="email"
                placeholder="이메일" 
                value={email} 
                onChange={handleChange}
            />
            <InputWithLabel 
                label="아이디" 
                name="username" 
                placeholder="아이디" 
                value={username} 
                onChange={handleChange}
            />
            <InputWithLabel 
                label="비밀번호" 
                name="password" 
                placeholder="비밀번호"
                type="password" 
                value={password} 
                onChange={handleChange}
            />
            <InputWithLabel 
                label="비밀번호 확인" 
                name="passwordConfirm" 
                placeholder="비밀번호 확인" 
                type="password" 
                value={passwordConfirm}
                onChange={handleChange}
            />
            {message && <AuthError>{message}</AuthError>}
            <AuthButton onClick={handleLocalRegister}>회원가입</AuthButton>
            <RightAlignedLink to="/auth/login">로그인</RightAlignedLink>
        </AuthContent>
    );
};