
import './App.css';
import Home from './component/Home';
import {  useAppContext } from './context/Store';

function App() {
  // const {hello}=useAppContext()
  
  return (
    <div>
     <Home/>
    </div>
  );
}

export default App;
