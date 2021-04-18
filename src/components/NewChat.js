import React, { useEffect, useState } from 'react';
import './NewChat.css';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Api from '../Api';

export default ({user, chatList, show, setShow}) => {

    const [list, setList] = useState([]);

    const handleClose = () => {
        setShow(false)
    }

    useEffect(() => {
        const getList = async () => {
            if(user !== null){
                let results = await Api.getContactList(user.id);
                setList(results);
            }
        }
        getList();
    },[user]);

    const addNewChat = async (user2) => {
        await Api.addNewChat(user, user2);

        handleClose();
    }

    return (
        <div className="newChat" style={{left: show?'0':'-500px'}}>
            <div className="newChatHead">
                <div onClick={handleClose} className="newChatBackButton">
                    <ArrowBackIcon style={{color: '#FFF'}}/>
                </div>
                <div className="newChatHeadTitle">Nova Conversa</div>
            </div>  
            <div className="newChatList">
                {list.map((item, key) => (
                    <div onClick={() => addNewChat(item)} className="newChatItem" key={key}>
                        <img className="newChatItemAvatar" src={item.avatar} alt="Avatar"/>
                        <div className="newChatItemName">{item.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}