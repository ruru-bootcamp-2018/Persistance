import React from 'react'
import { connect } from 'react-redux'

import ReactDOM from 'react-dom'

import moment from 'moment'

class ChatWindow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            msgs: [],
            chatMessage:"",
            localSocket: this.props.socket
        }
        this.addMsgToChat = this.addMsgToChat.bind(this);
    }

    componentDidMount() {
        this.state.localSocket.on('chat-up', (msg) => {
            this.addMsgToChat(msg);
        })
        this.state.localSocket.on('joinGame', (id, user_name) => {
            const msg = {
                userName: user_name,
                date: new Date(),
                chatMessage: `${user_name} has joined the game!`
            }
            this.addMsgToChat(msg)
        })
    }



    addMsgToChat(msg) {
        let prevMsgs = this.state.msgs

        // const newMsg = `${new Date}: ${msg}`
        prevMsgs.push(msg)
        this.setState({
            msgs:prevMsgs.map(msg => ({...msg})),
        }, () => this.scrollToBot())
    }

    scrollToBot() {
        ReactDOM.findDOMNode(this.refs.chats).scrollTop = ReactDOM.findDOMNode(this.refs.chats).scrollHeight;
    }

    submit(e){
        e.preventDefault();
        if (this.state.chatMessage) {
        const userName = this.props.auth.user.user_name
        const newMsg = {
            userName,
            chatMessage: this.state.chatMessage,
            date: new Date
        }
        const roomID = this.props.id;

        console.log(newMsg)
        //this.addMsgToChat(`From Client: ${newMsg}`)
        this.state.localSocket.emit('chat-down', roomID, newMsg)
        }
        this.setState({chatMessage:""})
    }

    updateDetails(e){
        this.setState({
            [e.target.name]:e.target.value,
        })
    }

    render() {

        //console.log("game id is", this.props.id)
        const styleObj = { overflow: 'auto', height: '150px'}
        console.log(this.state.msgs)
        return (
            <form className="chatWindow" onSubmit={this.submit.bind(this)}>
                <div className="column is-6 is-offset-3 innerShadow" ref="chats" style={styleObj} >
                    {this.state.msgs.map((msg, i) => <span>
                        <p className="level-item has-text-white level-left"><b>{msg.userName}</b> - {msg.chatMessage} - ({moment(msg.date).fromNow()})</p>
                    </span>)}
                </div>
                <div className="column is-6 is-offset-3">
                <input style={{width: "95%" }} className="input is-small has-text-white innerShadow chatInput" type="text" onChange={this.updateDetails.bind(this)} name="chatMessage" value={this.state.chatMessage}/>
                <input className="button is-dark is-small chatSubmit raise-black" type="submit" value="➤" />
                </div>
            </form>
        )
    }

}

const mapStateToProps = (state) => state

export default connect(mapStateToProps)(ChatWindow)
