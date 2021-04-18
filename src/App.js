import React, { useEffect, useState } from 'react';

import './App.css';

import Api from './Api';

import ChatListItem from './components/ChatListItem';
import ChatIntro from './components/ChatIntro';
import ChatWindow from './components/ChatWindow';
import NewChat from './components/NewChat';
import Login from './components/Login';

import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';

export default () => {

  const [chatList, setChatList] = useState([]);
  const [activeChat, setActiveChat] = useState({});
  const [user, setUser] = useState(null);
  const [showNewChat, setShowNewChat] = useState(false);

  useEffect(() => {
    if(user !== null){
      let unSub = Api.onChatList(user.id, setChatList);
      return unSub;
    }
  },[user]);

  const handleShowNewChat = () =>{
    setShowNewChat(true)
  }

  const handleLoginData = async (u) => {
    let newUser = {
      id: u.uid,
      name: u.displayName,
      avatar: u.photoURL
    };
    await Api.addUser(newUser);
    setUser(newUser);
  }

  if(user === null) {
    return (<Login onReceive={handleLoginData}/>);
  }

  return (
    <div className="appWindow">
      <div className="sideBar">
        <NewChat chatList={chatList} user={user} show={showNewChat} setShow={setShowNewChat}/>
        <header>
          <img src={user.avatar} alt="Avatar" className="headerAvatar"/>
          <div className="headerButtons">
            <div className="headerBtn">
              <DonutLargeIcon style={{color: '#919191'}} />
            </div>
            <div className="headerBtn">
              <ChatIcon style={{color: '#919191'}} onClick={handleShowNewChat}/>
            </div>
            <div className="headerBtn">
              <MoreVertIcon style={{color: '#919191'}} />
            </div>
          </div>
        </header>

        <div className="search">
          <div className="searchInput">
            <SearchIcon fontSize="small" style={{color: '#919191'}} />
            <input type="search" placeholder="Procurar ou começar uma nova conversa"/>
          </div>
        </div>

        <div className="chatList">
          {chatList.map((item, key) => (
            <ChatListItem 
              key={key}
              data={item}
              active={activeChat.chatId === chatList[key].chatId}
              onClick={()=>setActiveChat(chatList[key])}
            />
          ))}
        </div>

        <div className="ass"></div>
      </div> 

      <div className="contentArea">
        {activeChat.chatId !== undefined &&
          <ChatWindow
            user={user}
            data={activeChat}
            setActive={setActiveChat}
          />
        }
        {activeChat.chatId === undefined &&
          <ChatIntro />
        }
      </div>    
    </div>
  )
}