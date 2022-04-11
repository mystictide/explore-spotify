import axios from "axios";
import authHelpers from "./authHelpers";

const spotifyHelpers = {
  searchArtist: async function (val) {
    let code = authHelpers.getCookie();
    let artists = [];
    await axios({
      method: "GET",
      url:
        "https://api.spotify.com/v1/search?q=" + val + "&type=artist&limit=18",
      headers: {
        Authorization: "Bearer " + code,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      json: true,
    }).then((res) => {
      artists = res.data.artists.items;
    });
    return artists;
  },
  searchTrack: async function (val) {
    let code = authHelpers.getCookie();
    let tracks = [];
    await axios({
      method: "GET",
      url:
        "https://api.spotify.com/v1/search?q=" + val + "&type=track&limit=24",
      headers: {
        Authorization: "Bearer " + code,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      json: true,
    }).then((res) => {
      tracks = res.data.tracks.items;
    });
    return tracks;
  },
  databySelectedTracks: async function (tracks) {
    let code = authHelpers.getCookie();
    let data = await this.getbyTracksWithSeed(code, tracks);
    document.cookie = "selection=;max-age=0;samesite=lax;Secure";
    await this.formattedDatabyTracks(data);
  },
  databySelectedArtists: async function (artists) {
    let code = authHelpers.getCookie();
    let data = await this.getbyArtistsWithSeed(code, artists);
    document.cookie = "selection=;max-age=0;samesite=lax;Secure";
    await this.formattedDatabyArtists(data);
  },
  databyAllTimeTopTracks: async function (range) {
    let code = authHelpers.getCookie();
    let tracks = await this.getUserTopTracks(code, range);
    let seed = await this.getTrackSeed(tracks);
    let data = await this.getbyTracksWithSeed(code, seed);
    await this.formattedDatabyTracks(data);
  },
  databyAllTimeTopArtists: async function (range) {
    let code = authHelpers.getCookie();
    let artists = await this.getUserTopArtists(code, range);
    let seed = await this.getArtistSeed(artists);
    let data = await this.getbyArtistsWithSeed(code, seed);
    await this.formattedDatabyArtists(data);
  },
  formattedDatabyTracks: async function (data) {
    let result = {
      seeds: data[0].seeds,
      tracks: data[0].tracks,
    };
    localStorage.setItem("spotiData", JSON.stringify(result));
    window.location.reload();
  },
  formattedDatabyArtists: async function (data) {
    let result = {
      seeds: data[0].seeds,
      tracks: data[0].tracks,
    };
    localStorage.setItem("spotiData", JSON.stringify(result));
    window.location.reload();
  },
  getTrackSeed: async function (res) {
    let trackSeed = [];
    res[0].items.forEach((e) => {
      trackSeed.push(e.id);
    });
    return trackSeed;
  },
  getArtistSeed: async function (res) {
    let artistSeed = [];
    res[0].items.forEach((e) => {
      artistSeed.push(e.id);
    });
    return artistSeed;
  },
  getUserTopTracks: async function (code, range) {
    let result = [];
    await axios({
      method: "GET",
      url:
        "https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=" + range,
      headers: {
        Authorization: "Bearer " + code,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      json: true,
    }).then((res) => {
      result.push(res.data);
    });
    return result;
  },
  getUserTopArtists: async function (code, range) {
    let result = [];
    await axios({
      method: "GET",
      url:
        "https://api.spotify.com/v1/me/top/artists?limit=5&time_range=" + range,
      headers: {
        Authorization: "Bearer " + code,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      json: true,
    }).then((res) => {
      result.push(res.data);
    });
    return result;
  },
  getbyTracksWithSeed: async function (code, trackSeed) {
    let result = [];
    await axios({
      method: "GET",
      url:
        "https://api.spotify.com/v1/recommendations?limit=100&seed_tracks=" +
        trackSeed,
      headers: {
        Authorization: "Bearer " + code,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      json: true,
    }).then((res) => {
      result.push(res.data);
    });
    return result;
  },
  getbyArtistsWithSeed: async function (code, artistSeed) {
    let result = [];
    await axios({
      method: "GET",
      url:
        "https://api.spotify.com/v1/recommendations?limit=100&seed_artists=" +
        artistSeed,
      headers: {
        Authorization: "Bearer " + code,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      json: true,
    }).then((res) => {
      result.push(res.data);
    });
    return result;
  },
  createPlaylist: async function () {
    let code = authHelpers.getCookie();
    let uid = authHelpers.getUserID();
    let uname = authHelpers.getUsername();
    let pid = "";
    await axios({
      method: "POST",
      url: "https://api.spotify.com/v1/users/" + uid + "/playlists",
      headers: {
        Authorization: "Bearer " + code,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        name: "created for " + uname ? uname : uid + ", by Explore Spotify",
        public: false,
      },
      json: true,
    }).then((res) => {
      pid = res.data.id;
    });
    await this.populatePlaylist(code, pid);
    window.open("https://open.spotify.com/playlist/" + pid, "_blank");
  },
  populatePlaylist: async function (code, pid) {
    let tUris = JSON.parse(localStorage.getItem("spotiData")).tracks.map(
      (t) => t.uri
    );
    let snapid = "";
    await axios({
      method: "POST",
      url: "https://api.spotify.com/v1/playlists/" + pid + "/tracks",
      headers: {
        Authorization: "Bearer " + code,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        uris: tUris,
        position: 0,
      },
      json: true,
    }).then((res) => {
      snapid = res;
    });
    return snapid;
  },
};

export default spotifyHelpers;
