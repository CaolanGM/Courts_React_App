import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import Login from './components/Login/Login'
import ViewCasesScreen from './components/View Cases/ViewCases'

function App() {
  return (
    <div className="App">
      <Router>
     
            <Routes>
              <Route path='/' exact element={
                <>
                  <h1>Home</h1>
                </>
              } />
              <Route path='/login' element={<Login/>}/>
              <Route path='/viewCases' element={<ViewCasesScreen/>}/>

              {/* <Route path='/booking/:id' element={<BookingScreen/>}/> */}

    
            </Routes>
            
    
            
        </Router>
    </div>
  );
}

export default App
