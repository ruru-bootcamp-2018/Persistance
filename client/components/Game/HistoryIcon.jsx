import React from 'react'
import { connect } from 'react-redux'
import { Tooltip } from 'react-tippy'
import History from './History'


class HistoryIcon extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {

    }

    render() {
        //const history = <History />
        return (
       
                <Tooltip 
                    position="right"
                    trigger="mouseenter"
                    useContext="true"
                    html={ <div className="myDiv container"> <History /> </div>}
                >
                    <img className="image is-32x32" src="/book-solid.svg" />
                </ Tooltip>
           
        )
    }

}

const mapStateToProps = (state) => state

export default connect(mapStateToProps)(HistoryIcon)
