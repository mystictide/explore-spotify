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
    const hashCode = window.location.hash;
    let token = window.localStorage.getItem("spotiToken");

    if (!token && hashCode) {
      token = authHelpers.getHashCode(hashCode);

      window.location.hash = "";
      window.localStorage.setItem("spotiToken", token);
      setToken(token);
    }
  }, [])


  return (
    <div className="page-container">
      <div className='top'>
        <Header title='Explore'></Header>
        <Search></Search>
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