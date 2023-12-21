import React, { useState } from 'react'
import './cssFiles/Sidebar.css'
import { PersonPlus } from 'react-bootstrap-icons'
import SingleSideChat from './SingleSideChat'
import SideBarModal from './Modals/SideBarModal'
import ContactErrorModal from './Modals/ContactErrorModal';
import dataBase from './DataBase'

function Sidebar({ user, chatWith }) {

  const [chatsArray, setChatsArray] = useState([]);
  const [openModel, setOpenModel] = useState(false);

  const [openErrorModel, setOpenErrorModel] = useState(() => false);
  const [errorDescription, seterrorDescription] = useState('');

  const [a, setaa] =  useState(() => false);

  if( user === 'bob' && !a) {
    setChatsArray( arr => [...arr, 'mommy'])
    setChatsArray( arr => [...arr, 'daddy'])
    setChatsArray( arr => [...arr, 'sister'])
    setChatsArray( arr => [...arr, 'tomerk'])
    setChatsArray( arr => [...arr, 'noamit'])
    setaa(true);
  }


  //Array to save all the Chats
  const showChats = chatsArray.map((username) => { return <SingleSideChat name={username} myname={user} chatWithX={chatWith} /> })

  //returning the html that describe the sidebar with all the logic inside(as function calls).
  return (
    <>
      <div className='sidebar'>
        <div className='sideBarModal'>
          {openModel && <SideBarModal myUser={user} close_modal={setOpenModel} setterContactsArray={setChatsArray} contactsArray={chatsArray}
            errorModalSetter={setOpenErrorModel} errorMessage={seterrorDescription} />}
        </div>
        <div className='sideBarModal'>
          {openErrorModel && <ContactErrorModal close_modal_error={setOpenErrorModel} message={errorDescription} />}
        </div>
        <div className='sidebar_header'>
          <img src={dataBase.usersDataBase.get(user).img} className="rounded-circle" alt="user" />
          <div id="userName">{dataBase.usersDataBase.get(user).displayName}</div>
          <button id='presonPlus_button' onClick={() => { setOpenModel(true); }}>
            <PersonPlus />
          </button>
        </div>
        <div className='sidebar_chats'>
          {showChats}
        </div>
      </div>
    </>
  )
}

export default Sidebar