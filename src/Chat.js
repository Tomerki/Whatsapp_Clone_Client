import React, { useState } from 'react'
import './cssFiles/Chat.css'
import { Paperclip, CameraReels, Mic, Image } from 'react-bootstrap-icons'
import ModalRecord from './Modals/ModalRecord'
import dataBase from './DataBase'
import ModalImage from './Modals/ModalImage'


// the chat component that implement the logic of all the messages.


function Chat({ user, contact, setterLastMsgInArray, lastMsgInArray }) {

  const [input, setInput] = useState("")
  const [activeRecord, setActiveRecord] = useState(false)
  const [audioMessage, setAudioMessage] = useState("")
  const [file, setFile] = useState(() => null)
  const [fileMsg, setFileMsg] = useState(() => false)
  const [fileKind, setFileKind] = useState(() => '')
  const [fileURL, setFileURL] = useState(() => null)
  const [imageVal, setImageVal] = useState('')
  const [videoVal, setVideoVal] = useState('')

  //function to get the current time - for the messages.
  const getTime = () => {
    let today = new Date();
    let hour = String(today.getHours()).padStart(2, '0');
    let min = String(today.getMinutes()).padStart(2, '0');
    return hour + ":" + min
  }

  //create an array of messages and when the user send new message the page render and this array get update
  const showMessage = dataBase.usersDataBase.get(user).userChats.get(contact).msgArray.map((msg) => { return msg })

  //when sending a message we return the message with nice design and also check which kind of message.
  const newMessage = (e) => {
    e.preventDefault();
    if (activeRecord) {
      dataBase.usersDataBase.get(user).userChats.get(contact).msgArray.push(<p className={`message ${true && 'recive_message'}`}>
        {audioMessage}
        <br />
        {input}
        <span className='message_time'>{getTime()}</span></p>)

      dataBase.usersDataBase.get(user).userChats.get(contact).lastMsg = "VOICE MESSAGE";
      dataBase.usersDataBase.get(user).userChats.get(contact).lastMsgTime = getTime();
    }
    else if (fileMsg) {
      dataBase.usersDataBase.get(user).userChats.get(contact).msgArray.push(<p className={`message ${true && 'recive_message'}`}>
        {file}
        <br />
        {input}
        <span className='message_time'>{getTime()}</span></p>)

      dataBase.usersDataBase.get(user).userChats.get(contact).lastMsg = fileKind;
      dataBase.usersDataBase.get(user).userChats.get(contact).lastMsgTime = getTime();
    }

    else if (input.length > 0) {
      dataBase.usersDataBase.get(user).userChats.get(contact).msgArray.push(<p className={`message ${true && 'recive_message'}`}>
        {input}
        <span className='message_time'>{getTime()}</span></p>)

      dataBase.usersDataBase.get(user).userChats.get(contact).lastMsg = input;
      dataBase.usersDataBase.get(user).userChats.get(contact).lastMsgTime = getTime();
    }

    setFileMsg(() => false)
    setFileKind(() => '')
    setFileURL(() => null)
    setFile(() => null)
    setActiveRecord(false)
    setInput("")
    setterLastMsgInArray(!lastMsgInArray);

    const el = document.getElementById('b')
    if (el) {
    el.scrollTop = el.scrollHeight;
    el.scrollTop = el.scrollHeight;
    }
  }

  //function to create source File from the URL and check if the file is image or video
  const getFile = (e, kind) => {
    if (e.target.files) {
      if (e.target.files[0]) {
        setFileMsg(true)
        setFileKind(kind)
        const URLfile = URL.createObjectURL(e.target.files[0])
        if (kind === "VIDEO") {
          setFile(<video controls="controls" src={URLfile} type="video/*" className='send_img' alt='' />)
        }
        else {
          setFile(<img src={URLfile} className='send_img' alt='' />)
        }
        setFileURL(URLfile)
      }
    }
  }


  //when the page render, returning the html that create the chat itself.
  return (
    <div className='chat'>
      <div className='chat_header'>
        <img src={dataBase.usersDataBase.get(contact).img} id="rounded-circle_chat" className="rounded-circle" alt='user' />
        <div className='header_info'>
          <div id='header_info_name'> {dataBase.usersDataBase.get(contact).displayName}</div>
        </div>
      </div>
      <div className='chat_body' id='b'>
        {showMessage}
      </div>

      <div className='chat_input'>
        <div className="btn-group dropup">
          <button id="Paperclip_button" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
            <Paperclip />
          </button>
          <ul className="dropdown-menu">
            <div className='buttons_optaions'>
              <button onClick={() => setVideoVal('')}>
                <label htmlFor="video">&nbsp;<CameraReels />&nbsp;</label>
                <input id="video" type="file" accept="video/*" hidden value={videoVal} onChange={(e) => getFile(e, "VIDEO")} />
              </button>

              <button onClick={() => setActiveRecord(true)}>&nbsp;<Mic />&nbsp;</button>

              <button onClick={() => setImageVal('')}>
                <label htmlFor="img">&nbsp;<Image />&nbsp;</label>
                <input id="img" type="file" accept="image/png, image/jpeg" hidden value={imageVal} onChange={(e) => { getFile(e, "IMAGE"); }} />
              </button >
            </div>
          </ul>
        </div>

        <form>
          <input placeholder='Type a Message' value={input} onChange={(e) => setInput(e.target.value)} />
          <button type='submit' onClick={newMessage}>Send</button>
        </form>
      </div>
      {/* modals for the recording and images, videos messages */}
      {activeRecord && <ModalRecord modalSetter={setActiveRecord} messageSetter={setAudioMessage} time={getTime} />}
      {fileMsg && <ModalImage modalSetter={setFileMsg} fileToSend={fileURL} kind={fileKind} />}    </div>
  )
}
export default Chat