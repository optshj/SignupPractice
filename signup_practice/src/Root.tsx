import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';

export default function Root({store}:any){
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<App/>}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
};