
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
      return token;
    }
    else if (err) {
      return err;
    }
    else {
      return null;
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