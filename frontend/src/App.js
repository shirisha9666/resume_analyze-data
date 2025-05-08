
import './App.css';
import Home from './component/Home';
import { Route,Routes } from 'react-router-dom';
import Suggestions from './component/Suggestions ';


function App() {

  
  return (
    <div className='main'>
  
     <Routes>
     <Route path="/" element={  <Home/>}/>
      <Route path='/resume/suggestions' element={<Suggestions/>}/>
     </Routes>
    </div>
  );
}

export default App;
