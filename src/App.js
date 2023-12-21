import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login';
import Register from './Register'
import Appbody from './Appbody'
import './Modals/Modal.css'
import Realod from "./Reload";

function App() {

  const [newUser, setNewUser] = useState('')

  const startApp = () => {
    if (newUser === '') {
      return (
        <BrowserRouter>
          <Routes>
          <Route path='/' element={<Login userSetter={setNewUser} />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/chat' element={<Realod userSetter={setNewUser} />}></Route>
          </Routes>
        </BrowserRouter>
      );
    }
    else {
      return (
        <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login userSetter={setNewUser} />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/chat' element={<Appbody userChat={newUser} />}></Route>
          </Routes>
        </BrowserRouter>
      </>
      )
    }

  }

  //using routes to nevigate without re-fresh the page
  return (
    startApp()
  );

}
export default App;
