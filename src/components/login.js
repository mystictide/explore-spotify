import React from 'react';
import authHelpers from '../authHelpers';

export default class login extends React.Component {

  render() {
    if (!this.props.token || this.props.token === "access_denied") {
      return (
        <div className="auth-container">
          <button onClick={login.getAuth} className="auth-link">Login with Spotify</button>
          {this.props.token === "access_denied" ? <h6>something went wrong, do try again</h6> : ""}
        </div>
      )
    }
    else {
      return (""
        // <div className="search-container">
        //   <input type="text" onKeyPress={search.handleKeyPress} name="search" placeholder="explore by genre.." />
        //   <button onClick={Result.getRandomUsers} className="random"></button>
        // </div>
      )
    }
  }
}

login.getAuth = () => {
  authHelpers.getAuth()
}