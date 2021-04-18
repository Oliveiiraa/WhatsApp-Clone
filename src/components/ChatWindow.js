import React, { useEffect, useState, useRef } from 'react';
import EmojiPicket from 'emoji-picker-react'
import './ChatWindow.css';
import MessageItem from './MessageItem';

import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Api from '../Api';

export default ({user, data, setActive}) => {

    const body = useRef();

    let recognition = null;
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition !== undefined) {
        recognition = new SpeechRecognition();
    }

    const [emojiOpen, setEmojiOpen] = useState(false);
    const [text, setText] = useState();
    const [listening, setListening] = useState(false);
    const [list, setList] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        if(body.current.scrollHeight > body.current.offsetHeight){
            body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight;
        }
    },[list])

    useEffect(() => {
        setList([]);
        let unsub = Api.onChatContent(data.chatId, setList, setUsers);
        return unsub;
    }, [data.chatId]);

    const handleEmojiClick = (e, emojiObject) => {
        setText(text + emojiObject.emoji)
    }

    const handleOpenEmoji = () => {
        setEmojiOpen(true);
    }

    const handleCloseEmoji = () => {
        setEmojiOpen(false);
    }

    const handleMicClick = () => {
        if(recognition !== null) {
            recognition.onstart = () => {
                setListening(true);
            }
            recognition.onend = () => {
                setListening(false);
            }
            recognition.onresult = (e) => {
                setText(e.results[0][0].transcript);
            }
            
            recognition.start();
        }
    }

    const handleInputKeyUp = (e) => {
        if(e.keyCode == 13){
            handleSendClick();
        }
    }

    const handleSendClick = () => {
        if(text !== ''){
            Api.sendMessage(data, user.id, 'text', text, users);
            setText('');
            setEmojiOpen(false);
        }
    }

    const handleCloseWindow = () => {
        setActive({});
    }

    return (
        <div>
            <div className="chatWindow">
                <div className="chatWindowHeader">
                    <div className="chatWindowHeaderInfo">
                        <div className="chatWindowBtn" onClick={handleCloseWindow}><ArrowBackIosIcon style={{color: '#919191'}}/></div>
                        <img className="chatWindowAvatar" src={data.image} alt="Avatar"/>
                        <div className="chatWindowName">{data.title}</div>
                    </div>

                    <div className="chatWindowHeaderButtons">
                        <div className="chatWindowBtn">
                            <SearchIcon style={{color: '#919191'}} />
                        </div>

                        <div className="chatWindowBtn">
                            <AttachFileIcon style={{color: '#919191'}} />
                        </div>

                        <div className="chatWindowBtn">
                            <MoreVertIcon style={{color: '#919191'}} />
                        </div>
                    </div>
                </div>
                <div ref={body} className="chatWindowBody">
                    {list.map((item, key) => (
                        <MessageItem 
                            key={key}
                            data={item}
                            user={user}
                        />
                    ))}
                </div>

                <div className="chatWindowEmojiArea" style={{height: emojiOpen ? '200px' : '0px'}}>
                    <EmojiPicket
                        onEmojiClick={handleEmojiClick}
                        disableSearchBar
                        disableSkinTonePicker
                    />
                </div>
                
                <div className="chatWindowFooter">
                    <div className="chatWindowPre">
                        <div className="chatWindowBtn" onClick={handleCloseEmoji} style={{width: emojiOpen ? '40px' : '0px'}}>
                            <CloseIcon style={{color: '#919191'}} />
                        </div>
                        
                        <div className="chatWindowBtn" onClick={handleOpenEmoji}>
                            <InsertEmoticonIcon style={{color: emojiOpen ? '#009688' : '#919191'}} />
                        </div>
                    </div>
                    <div className="chatWindowInputArea">
                        <input 
                            className="chatWindowInput" 
                            type="text"
                            placeholder= "Digite uma mensagem"
                            value = {text}
                            onChange= {e=>setText(e.target.value)}
                            onKeyUp={handleInputKeyUp}
                        />
                    </div>
                    <div className="chatWindowPos">
                        {text && 
                            <div onClick={handleSendClick} className="chatWindowBtn">
                                <SendIcon style={{color: '#919191'}} />
                            </div>
                        }

                        {!text && 
                            <div onClick={handleMicClick} className="chatWindowBtn">
                                <MicIcon style={{color: listening ? '#126ece' :'#919191'}} />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}