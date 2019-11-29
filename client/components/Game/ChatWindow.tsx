import React, { SyntheticEvent, useState } from 'react';
import {
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
} from 'react-redux';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import { AppState } from '../../reducers';

type Message = {
    chatMessage: string;
    date: Date;
    userName: string;
};

type Messages = Message[];

const ChatWindow = () => {
    const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
    const initialMessages: Messages = [];
    const [messages, setMessages] = useState(initialMessages);
    const [chatMessage, setChatMessage] = useState('');
    const localSocket = useSelector(state => state.socket);

    const addMessageToChat = (message: Message) => {
        let newMessages = [...messages, message];
        setMessages(newMessages);
        scrollToBottom();
    };

    const scrollToBottom = () => {
        findDOMNode(this.refs.chats).scrollTop = findDOMNode(
            this.refs.chats
        ).scrollHeight;
    };

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        if (chatMessage) {
            const userName = useSelector(state => state.auth.user.user_name);
            const newMsg = {
                userName,
                chatMessage: chatMessage,
                date: new Date(),
            };
            const roomID = useSelector(state => state.id);

            console.log(newMsg);
            localSocket.emit('chat-down', roomID, newMsg);
        }
        setChatMessage('');
    };

    const styleObj = { overflow: 'auto', height: '120px' };

    return (
        <form className="chatWindow" onSubmit={e => handleSubmit(e)}>
            <div
                className="column is-10 is-offset-1 innerShadow"
                ref="chats"
                style={styleObj}
            >
                {messages.map((message: Message, i: number) => (
                    <span>
                        <p className="level-item has-text-white is-size-7 level-left">
                            <b>{message.userName}</b> - {message.chatMessage} -
                            ({moment(message.date).fromNow()})
                        </p>
                    </span>
                ))}
            </div>
            <div className="column is-6 is-offset-3">
                <input
                    style={{ width: '95%' }}
                    className="input is-small has-text-white innerShadow chatInput"
                    type="text"
                    onChange={e => setChatMessage(e.target.value)}
                    name="chatMessage"
                    value={chatMessage}
                />
                <input
                    className="button is-dark is-small chatSubmit raise-black"
                    type="submit"
                    value="➤"
                />
            </div>
        </form>
    );
};

export default ChatWindow;
