import React from 'react';
import Result from './result';
import authHelpers from '../authHelpers';

export default class search extends React.Component {

  state = {
    loggedIn: false,
  }

  async componentDidMount() {
    let token =  window.localStorage.getItem("spotiToken");
    if (token) {
      this.setState({ loggedIn: true });
    }
  }

  render() {
    if (!this.state.loggedIn) {
      return (
        <div className="auth-container">
          <button onClick={search.getAuth} className="auth-link">Login with Spotify</button>
        </div>
      )

    }
    else {
      return (
        <div className="search-container">
          <input type="text" onKeyPress={search.handleKeyPress} name="search" placeholder="explore by genres.." />
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