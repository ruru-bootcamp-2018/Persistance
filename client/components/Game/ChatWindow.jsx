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

        this.updateDetails = this.updateDetails.bind(this);
        this.addMsgToChat = this.addMsgToChat.bind(this);
    }

    componentDidMount() {
        this.state.localSocket.on('chat-up', (msg) => {
            this.addMsgToChat(msg);
        })
        this.state.localSocket.on('joinGame', (id, user_name) => {
            this.addMsgToChat(`${user_name} joined game ${id}`)
        })
    }



    addMsgToChat(msg) {
        let prevMsgs = this.state.msgs

        const newMsg = `${new Date}: ${msg}`
        prevMsgs.unshift(newMsg)
        this.setState({
            msgs:prevMsgs,
            chatMessage:""
        })
    }

    submit(e){
        e.preventDefault();
        if (this.state.chatMessage) {
        const userName = this.props.auth.user.user_name
        const newMsg = `${userName}: ${this.state.chatMessage}`
        const roomID = this.props.id;

        console.log(newMsg)
        //this.addMsgToChat(`From Client: ${newMsg}`)
        this.state.localSocket.emit('chat-down', roomID, newMsg)
        }
    }

    updateDetails(e){
        this.setState({
            [e.target.name]:e.target.value,
        })
    }

    render() {
        //console.log("game idated is", this.props.id)
        const styleObj = { overflow: 'scroll', height: '150px', width:'100%' }
        return (
            <form className="chatWindow" onSubmit={this.submit.bind(this)}>
                <p> ChatWindow</p>
                <div className="chatDisplay" style={styleObj} >
                    {this.state.msgs.map((msg) => <p className="has-text-left"> {msg} </p>)}
                </div>
                <input className="input is-small column is-6 is-offset-3" type="text" onChange={this.updateDetails.bind(this)} name="chatMessage" value={this.state.chatMessage}/>
                <input className="button is-info is-outlined is-small" type="submit" value="Send a message!" />

            </form>
        )
    }

}

const mapStateToProps = (state) => state

export default connect(mapStateToProps)(ChatWindow)
