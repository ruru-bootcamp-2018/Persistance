import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../actions/logout'

function Nav(props) {
  return (
    <div className="Nav hero is-small is-info">
      <div className="hero-body">
        <Link className="is-size-6 is-pulled-left" to="/lobby">Home</Link>
        
        {props.auth.isAuthenticated && <p className="nav-item is-pulled-right">you are logged in as {props.auth.user.user_name}</p>}
        {props.auth.isAuthenticated
          ? <button className="nav-item is-pulled-left" onClick={() => props.dispatch(logoutUser())}>Logout</button>
          : <div className="columns nav-menu">
            <Link className="nav-item" to="/login">Login</Link>&nbsp;
            <Link className="nav-item" to="/register">Register</Link>
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
