import React from 'react';
import Result from './result';
import authHelpers from '../authHelpers';

export default class search extends React.Component {

  render() {
    if (!this.props.token || this.props.token === "access_denied") {
      return (
        <div className="auth-container">
          <button onClick={search.getAuth} className="auth-link">Login with Spotify</button>
          {this.props.token === "access_denied" ? <h6>something went wrong, do try again</h6> : ""}
        </div>
      )
    }
    else {
      return (
        <div className="search-container">
          <input type="text" onKeyPress={search.handleKeyPress} name="search" placeholder="explore by genre.." />
          <button onClick={Result.getRandomUsers} className="random">random genre</button>
        </div>
      )
    }
  }
}

search.handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    const val = e.target.value;
    if (isNaN(val) && val.length >= 3) {
      search.searchUser(val);
    }
  }
}

search.searchUser = (username) => {
  Result.getUsers(username);
}

search.getAuth = () => {
  authHelpers.getAuth()
}