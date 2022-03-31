import React, { useState, useEffect } from 'react';
import './content/css/App.scss';
import authHelpers from './authHelpers';
import spotifyHelpers from './spotifyHelpers';
import Header from './components/header';
import Footer from './components/footer';
import Result from './components/result';
import Login from './components/login';

function App() {

  const [token, setToken] = useState('');
  const [data, setData] = useState('');

  useEffect(() => {
    authHelpers.checkCookie();
    let hashCode = authHelpers.getHashCode();
    let token = authHelpers.getCookie();
    if (!token && hashCode) {
      token = authHelpers.getHashCode();
    }
    else if (token && hashCode) {
      token = authHelpers.getHashCode();
    }
    window.location.hash = "";
    if (token) {
      setToken(token);
    }
    let data = JSON.parse(localStorage.getItem("spotiData"));
    if (data) {
      setData(data)
    }
    console.log(data)
  }, [])

  return (
    <div className="page-container">
      <div className='top'>
        <Header title='Explore'></Header>
        <Login token={token}></Login>
      </div>
      <div className="main">
        <div className='results-container'>
          <div className="results">
            <Result token={token} data={data}></Result>
          </div>
        </div>
      </div>
      <div className="bottom"><Footer></Footer></div>
    </div>
  );
}

export default App;