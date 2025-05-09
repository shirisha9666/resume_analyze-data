
import './App.css';
import Home from './component/Home';
import { Route,Routes } from 'react-router-dom';
import Suggestions from './component/Suggestions ';
import  { Toaster } from 'react-hot-toast';


function App() {

  
  return (
    <div className='main'>
  
     <Routes>
     <Route path="/" element={  <Home/>}/>
      <Route path='/resume/suggestions' element={<Suggestions/>}/>
     </Routes>
     <Toaster/>
    </div>
  );
}

export default App;
