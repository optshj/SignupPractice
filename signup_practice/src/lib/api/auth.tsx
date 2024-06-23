import axios from 'axios';

export const checkEmailExists = (email: string) => axios.get('/api/auth/exists/email/' + email);
export const checkUsernameExists = (username: string) => axios.get('/api/auth/exists/username/' + username);

export const localRegister = ({email, username, password}: { email: string, username: string, password: string }) => axios.post('/api/auth/register/local', { email, username, password });
export const localLogin = ({email, password}:{email:string, password:string}) => axios.post('/api/auth/login/local', { email, password });

export const checkStatus = () => axios.get('/api/auth/check');
export const logout = () => axios.post('/api/auth/logout');