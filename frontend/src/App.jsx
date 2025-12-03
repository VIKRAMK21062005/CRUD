import {BrsowerRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import CreateUser from './pages/AddUser';
import UpdateUser from './pages/EditUser';
import Navbar from './components/Navbar';
import Notfound from './pages/NotFound';


function App(){
  return(
    <>
      <h1>CRUD Application</h1>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<CreateUser />} />
          <Route path='/update/:id' element={<UpdateUser />} />
          <Route path='*' element={<Notfound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;