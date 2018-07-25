import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../actions/logout'
import { Tooltip } from 'react-tippy'

function Nav(props) {
  const buttonStyle = 'button is-medium is-link is-inverted is-outlined homeButton'
  return (
    <div className="navbar-menu hero is-small">
      <div className="hero-body">

        {props.auth.isAuthenticated
          ?
          <div className="navbar-start">
            <img className="persistancetitle" src="/persistencetitle.png" />
            <br />
            <div className="navbar-end">

              <Tooltip
                // options
                position="bottom"
                trigger="mouseenter"
                html={(
                  <div className="userTooltip" >
                    <p> Logged in: </p>
                    <p>User: {props.auth.user.user_name} </p>
                    <p>Display: {props.auth.user.display_name ? props.auth.user.display_name : props.auth.user.user_name}</p>
                  </div>
                )}
              >
                <img style={{ borderRadius: "50%" }} className="image is-64x64" src={props.auth.user.img != " " ? props.auth.user.img : "https://tinyurl.com/y7drmeck"} />



              </Tooltip>
              <Link className={buttonStyle} to="/lobby">Home</Link>
              <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
                <span aria-hidden="true">
                  <button style={{ marginLeft: '1vw' }} className={buttonStyle} onClick={() => props.dispatch(logoutUser())}>
                    Logout
                  </button>
                </span>
              </a>
              <button style={{ marginLeft: '1vw' }} className={buttonStyle} onClick={() => props.dispatch(logoutUser())}>Logout</button>




            </div>
          </div>
          : <div className="navbar-start">
            <h1 className="title is-1">Persistence</h1>
            <div className="navbar-end">


              <a role="button" class="navbar-options" aria-label="menu" aria-expanded="false">
                <span aria-hidden="true"><Link className={buttonStyle} to="/lobby">Home</Link></span>
                <span aria-hidden="true"><Link className={buttonStyle} to="/login">Login</Link>&nbsp;</span>
                <span aria-hidden="true"><Link className={buttonStyle} to="/register">Register</Link></span>
              </a>

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
// https://tinyurl.com/y7drmeck - grey 