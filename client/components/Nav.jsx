import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../actions/logout'

function Nav(props) {
const buttonStyle = 'button is-medium is-link is-inverted is-outlined homeButton'
  return (
    <div className="navbar-menu hero is-small is-info">
      <div className="hero-body">

        {props.auth.isAuthenticated
          ?
            <div className="navbar-start">
            <h1 className="title is-1">Persistence</h1>
            <div className="navbar-end">
            <p className="nav-item is-size-5">You are logged in as {props.auth.user.user_name}</p>
            <button style={{marginLeft: '1vw'}} className={buttonStyle} onClick={() => props.dispatch(logoutUser())}>Logout</button>
            <Link className={buttonStyle} to="/lobby">Home</Link>
            </div>
            </div>
          : <div className="navbar-start">
            <h1 className="title is-1">Persistence</h1>
            <div className="navbar-end">
            <Link className={buttonStyle} to="/lobby">Home</Link>
            <Link className={buttonStyle} to="/login">Login</Link>&nbsp;
            <Link className={buttonStyle} to="/register">Register</Link>
            </div>
            </div>
        //This is how you do/don't display info based on login
      }
      </div>
    </div>
  )
}

const mapStateToProps = ({ auth }) => {
  return { auth }
}

export default connect(mapStateToProps)(Nav)
