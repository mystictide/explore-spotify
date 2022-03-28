
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
  getHashCode: function (hashCode) {
    let hash = hashCode;
    hash = hash.substring(1).split("&").find(e => e.startsWith("access_token")).split("=")[1];
    return hash;
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
  },
}

export default authHelpers;