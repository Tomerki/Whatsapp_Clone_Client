import React from 'react'
import './cssFiles/SingleSideChat.css'
import dataBase from './DataBase'

function SingleSideChat({ name, myname, chatWithX }) {

    return (
        <>
            <label className='SingleSideChat' htmlFor={name}>
                <img src={dataBase.usersDataBase.get(name).img} className="rounded-circle" alt="new contant" />
                <div className='SingleSideChat_info'>
                    <div className='a'>
                        <div id="info_name">{dataBase.usersDataBase.get(name).displayName} </div>
                        <p id="info_message">{dataBase.usersDataBase.get(myname).userChats.get(name).lastMsg}</p>
                    </div>
                </div>
                <div id="info_lastSeen">{dataBase.usersDataBase.get(myname).userChats.get(name).lastMsgTime}</div>
            </label>
            <input type="button" id={name} onClick={() => {chatWithX(name)}} hidden />
        </>

    )
}

export default SingleSideChat