import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './cssFiles/Login.css'
import LoginModal from './Modals/LoginModal'
import dataBase from './DataBase'

//Login component that implement the logic of 

function Login({ userSetter }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [openModel, setOpenModel] = useState(false);

    useEffect(() => {
        setIsLoggedIn(false)
        Valid();
    }, [userName, password])

    //while click login we render the page with new Login button(if one of the details ilegel), or go to the chat room
    const renderAuthButton = () => {
        if (isLoggedIn) {
            return (
                <Link to='/chat'>
                    <input type="submit" value="login" className="btn btn-outline-secondary" onClick={() => userSetter(userName)} />
                </Link>
            );
        } else {
            return (
                <input type="button" value="login" className="btn btn-outline-secondary" onClick={() => { setOpenModel(true); }} />
            );
        }
    }
    //checks Validetion of username and password
    const Valid = () => {
        if (userName.length > 0 && password.length > 0 && (dataBase.usersDataBase.has(userName) && dataBase.usersDataBase.get(userName).password === String(password))) {
            setIsLoggedIn(bool => bool = true)
        }
    }

    return (
        <div className='login'>
            <div className='allModals'>
                {openModel && <LoginModal close_modal={setOpenModel} />}
            </div>
            <div className='login_page'>
                <div className='login_header'>
                    NTM
                </div>
                <div className='login_body'>
                    <h2> Login </h2>
                    <form id="loginForm" className="form" >
                        <div className='login_body_input'>
                            <input placeholder="Username" className="login_input" type="text" value={userName}
                                onChange={e => {
                                    setUserName(e.target.value);
                                }} />
                        </div>
                        <div className='login_body_input'>
                            <input placeholder="Password" className="login_input" id="pass" type="password" value={password} onChange={e => { setPassword(e.target.value); }} />
                        </div>
                        <div className='login_buttom'>
                            {renderAuthButton()}
                        </div>
                    </form>

                    <div id='notregistered'>Not registered?&nbsp;
                        <span>
                            <Link to='/register' id="forRegister">
                                click here
                            </Link>
                            &nbsp;to Register.
                        </span>
                    </div>
                </div>
            </div >
        </div >
    );

}


export default Login;
