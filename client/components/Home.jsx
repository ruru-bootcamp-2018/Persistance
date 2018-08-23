import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

function Home(props) {
    document.location = props.auth.isAuthenticated ? "/lobby" : "/login"
  
  return (
    <div></div>
)
}

const mapStateToProps = ({ auth }) => {
  return { auth }
}

export default connect(mapStateToProps)(Home)

