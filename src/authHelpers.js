import { authCreds } from './authCreds';
import axios from "axios";

const authHelpers = {
  getAuth: function () {
    let url = 'https://accounts.spotify.com/authorize'
      + '?response_type=token'
      + '&client_id=' + encodeURIComponent(authCreds.client_id)
      + '&scope=' + encodeURIComponent(authCreds.scope)
      + '&redirect_uri=' + encodeURIComponent(authCreds.redirect_uri)
      + '&state=' + encodeURIComponent(authCreds.state);
    window.location.href = url;
  },
  getHashCode: function () {
    let hashParams = new URLSearchParams(window.location.hash.replace("#", "?"));
    let queryParams = new URLSearchParams(window.location.search.replace("#", "?"));
    let token = hashParams.get('access_token');
    let err = queryParams.get('error');
    if (token) {
      document.cookie = "spotiToken=" + token + ";max-age=3600;samesite=lax;Secure";
      return token;
    }
    else if (err) {
      return err;
    }
    else {
      return null;
    }
  },
  getCookie: function () {
    if (document.cookie) {
      return document.cookie
        .split('; ')
        .find(row => row.startsWith('spotiToken='))
        .split('=')[1];
    }
    else {
      return null;
    }
  },
  checkCookie: function () {
    if (document.cookie.split(';').some((item) => item.trim().startsWith('spotiToken='))) {
      return true;
    }
    else {
      document.cookie = "spotiData=;max-age=0;samesite=lax;Secure";
      localStorage.removeItem("spotiData");
      return false;
    }
  },
  getAccessToken: async function (code) {
    await axios({
      method: 'GET',
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Authorization': 'Basic ' + code,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: {
        grant_type: 'client_credentials'
      },
      json: true
    }).then(res => {
      console.log(res);
    })
  }
}

export default authHelpers;