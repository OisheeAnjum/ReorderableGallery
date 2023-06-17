import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './components/Home';

function App() {
    return (
        <div className="App">
            <Home />
            <ToastContainer />
        </div>
    );
}

export default App;
