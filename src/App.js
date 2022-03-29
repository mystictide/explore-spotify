import React, { useState, useEffect } from 'react';
import authHelpers from './authHelpers';
import './content/css/App.scss';
import Header from './components/header';
import Footer from './components/footer';
import Result from './components/result';
import Search from './components/search';

function App() {

  const [token, setToken] = useState('');

  useEffect(() => {
    let hashCode = authHelpers.getHashCode();
    let token = window.localStorage.getItem("spotiToken");
    if (!token && hashCode) {
      token = authHelpers.getHashCode();
      if (token) {
        window.localStorage.setItem("spotiToken", token);
      }
    }
    else if (token && hashCode) {
      token = authHelpers.getHashCode();
      if (token) {
        window.localStorage.setItem("spotiToken", token);
      }
    }
    window.location.hash = "";
    setToken(token);
  }, [])

  return (
    <div className="page-container">
      <div className='top'>
        <Header title='Explore'></Header>
        <Search token={token}></Search>
      </div>
      <div className="main">
        <div className='results-container'>
          <div className="results">
            <Result></Result>
          </div>
        </div>
      </div>
      <div className="bottom"><Footer></Footer></div>
    </div>
  );
}

export default App;