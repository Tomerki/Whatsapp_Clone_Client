import React, { useState } from 'react'
import Chat from './Chat';
import Sidebar from './Sidebar';
import './cssFiles/Appbody.css'
import EmptyChat from './EmptyChat';


//function that starts the application after login

function Appbody({userChat}) {

  const [openChatWith, setOpenChatWith] = useState('');
  const [updateLastMsg, setUpdateLastMsg] = useState(true);

  //starts with emptyChat until the user pick one.
  const renderCharOrEmtyChat = () => {
    if (openChatWith !== '') {
      return (<Chat user={userChat} contact={openChatWith} setterLastMsgInArray={setUpdateLastMsg} lastMsgInArray={updateLastMsg}/>);
    } else {
      return (<EmptyChat />);
    }
  }


  //return the sidebar and checks if the user pick a chat to open.
  return (
    <div className="app">
      <div className="app_body">
        <Sidebar user={userChat} chatWith={setOpenChatWith} />
        {renderCharOrEmtyChat()}
      </div>
    </div>
  )
}

export default Appbody;