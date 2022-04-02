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
      this.setUserID(token);
      return token;
    }
    else if (err) {
      return err;
    }
    else {
      return null;
    }
  },
  setUserID: async function (token) {
    await axios({
        method: 'GET',
        url: 'https://api.spotify.com/v1/me',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        json: true
    }).then(res => {
      if (res) {
        document.cookie = "spotiUID=" + res.data.id + ";max-age=3600;samesite=lax;Secure";
        document.cookie = "spotiUN=" + res.data.display_name + ";max-age=3600;samesite=lax;Secure";
      }
    })
  },
  getUserID: function () {
    if (document.cookie) {
      return document.cookie
        .split('; ')
        .find(row => row.startsWith('spotiUID='))
        .split('=')[1];
    }
    else {
      return null;
    }
  },
  getUsername: function () {
    if (document.cookie) {
      return document.cookie
        .split('; ')
        .find(row => row.startsWith('spotiUN='))
        .split('=')[1];
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
      document.cookie = "selection=;max-age=0;samesite=lax;Secure";
      return true;
    }
    else {
      document.cookie = "selection=;max-age=0;samesite=lax;Secure";
      localStorage.removeItem("spotiData");
      return false;
    }
  },
  logout: function () {
    document.cookie = "spotiToken=;max-age=0;samesite=lax;Secure";
    document.cookie = "spotiUID=;max-age=0;samesite=lax;Secure";
    document.cookie = "spotiUN=;max-age=0;samesite=lax;Secure";
    document.cookie = "Selection=;max-age=0;samesite=lax;Secure";
    localStorage.removeItem("spotiData");
    window.location.reload();
  }
}

export default authHelpers;