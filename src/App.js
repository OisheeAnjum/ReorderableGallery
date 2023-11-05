import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Landingpage from './components/Landingpage';
import { setDevice } from './features/DeviceagentSlice';

function App() {
    const dispatch = useDispatch();
    const windowWidth = useCallback(() => {
        const position = window.innerWidth;
        dispatch(setDevice(position));
    }, [dispatch]);

    useEffect(() => {
        const position = window.innerWidth;
        dispatch(setDevice(position));
        window.addEventListener('resize', windowWidth);
        return () => {
            window.removeEventListener('resize', windowWidth);
        };
    }, [dispatch, windowWidth]);
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landingpage />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </>
    );
}

export default App;
