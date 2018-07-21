import React from 'react'
import { connect } from 'react-redux'

class ChatWindow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            msgs: [
                "Game: This is the first chat message",
            ],
            chatMessage:"",
            localSocket: this.props.socket
        }
        this.state.localSocket.on('chat-up', (msg) => {
            this.addMsgToChat(msg);
        })
        this.updateDetails = this.updateDetails.bind(this);
        this.addMsgToChat = this.addMsgToChat.bind(this);
    }

    componentDidMount() {

    }

    submitEnter(e){
        if (e.key === "Enter") this.submit()
    }

    addMsgToChat(msg) {
        let prevMsgs = this.state.msgs
        
        const newMsg = `${msg}`
        prevMsgs.push(newMsg)
        this.setState({
            msgs:prevMsgs,
            chatMessage:""
        })
    }

    submit(e){
        e.preventDefault();
        const userName = this.props.auth.user.user_name
        const newMsg = `${userName}: ${this.state.chatMessage}`
        
        
        console.log(newMsg)
        //this.addMsgToChat(`From Client: ${newMsg}`)
        this.state.localSocket.emit('chat-down', newMsg)
    }

    updateDetails(e){
        this.setState({
            [e.target.name]:e.target.value,
        })
    }

    render() {
        const styleObj = { overflow: 'scroll', height: '150px', width:'80%' }
        return (
            <form className="chatWindow" onSubmit={this.submit.bind(this)}>
                <p> ChatWindow</p>
                <div className="chatDisplay" style={styleObj} >
                    {this.state.msgs.map((msg) => <p> {msg} </p>)}
                </div>
                <input type="text" onChange={this.updateDetails.bind(this)} onKeyUp={this.submitEnter.bind(this)} name="chatMessage" value={this.state.chatMessage}/>
                <input type="submit" value="Send a message!" />

            </form>
        )
    }

}

const mapStateToProps = (state) => state

export default connect(mapStateToProps)(ChatWindow)
