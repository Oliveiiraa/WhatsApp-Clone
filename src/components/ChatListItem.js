import React, { useEffect, useState } from 'react';
import './ChatListItem.css'

export default ({onClick, active, data})=>{
    const [time, setTime] = useState('');

    useEffect(()=>{
        if(data.lastMessageDate > 0){
            let d = new Date(data.lastMessageDate.seconds * 1000);
            let hours = d.getHours();
            let minutes = d.getMinutes();
            hours = hours < 10 ? '0'+hours : hours;
            minutes = minutes <10 ? '0'+minutes : minutes;

            setTime(`${hours}:${minutes}`);
        }
    }, [data])
    
    return (
        <div className={`chatListItem ${active?'active':''}`} onClick={onClick}>
            <img className="chatListItemAvatar" src={data.image} alt="Avatar"/>
            <div className="chatListItemLines">
                <div className="chatListItemLine">
                    <div className="chatListItemName">{data.title}</div>
                    <div className="chatListItemDate">{time}</div>
                </div>

                <div className="chatListItemLine">
                    <div className="chatListItemLastMsg">
                        <p>{data.lastMessage}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}