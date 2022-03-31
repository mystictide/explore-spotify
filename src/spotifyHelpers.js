import axios from "axios";
import authHelpers from "./authHelpers";

const spotifyHelpers = {
    databyTopTracks: async function () {
        let code = authHelpers.getCookie();
        let tracks = await this.getUserTopTracks(code);
        let seed = await this.getTrackSeed(tracks);
        let data = await this.getbyTopTracksWithSeed(code, seed);
        await this.formattedDatabyTracks(data);
    },
    databyTopArtists: async function () {
        let code = authHelpers.getCookie();
        let artists = await this.getUserTopArtists(code);
        let seed = await this.getArtistSeed(artists);
        let data = await this.getbyTopArtistsWithSeed(code, seed);
        await this.formattedDatabyArtists(data);
    },
    formattedDatabyTracks: async function (data) {
        let result = {
            seeds: data[0].seeds,
            tracks: data[0].tracks,
        }
        localStorage.setItem("spotiData", JSON.stringify(result))
        window.location.reload();
    },
    formattedDatabyArtists: async function (data) {
        let result = {
            seeds: data[0].seeds,
            tracks: data[0].tracks,
        }
        localStorage.setItem("spotiData", JSON.stringify(result))
        window.location.reload();
    },
    getTrackSeed: async function (res) {
        let trackSeed = [];
        res[0].items.forEach(e => {
            trackSeed.push(e.id)
        });
        return trackSeed;
    },
    getArtistSeed: async function (res) {
        let artistSeed = [];
        res[0].items.forEach(e => {
            artistSeed.push(e.id)
        });
        return artistSeed;
    },
    getUserTopTracks: async function (code) {
        let result = [];
        await axios({
            method: 'GET',
            url: 'https://api.spotify.com/v1/me/top/tracks?limit=5',
            headers: {
                'Authorization': 'Bearer ' + code,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            json: true
        }).then(res => {
            result.push(res.data);
        })
        return result;
    },
    getUserTopArtists: async function (code) {
        let result = [];
        await axios({
            method: 'GET',
            url: 'https://api.spotify.com/v1/me/top/artists?limit=5',
            headers: {
                'Authorization': 'Bearer ' + code,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            json: true
        }).then(res => {
            result.push(res.data);
        })
        return result;
    },
    getbyTopTracksWithSeed: async function (code, trackSeed) {
        let result = [];
        await axios({
            method: 'GET',
            url: 'https://api.spotify.com/v1/recommendations?limit=100&seed_tracks=' + trackSeed,
            headers: {
                'Authorization': 'Bearer ' + code,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            json: true
        }).then(res => {
            result.push(res.data);
        })
        return result;
    },
    getbyTopArtistsWithSeed: async function (code, artistSeed) {
        let result = [];
        await axios({
            method: 'GET',
            url: 'https://api.spotify.com/v1/recommendations?limit=100&seed_artists=' + artistSeed,
            headers: {
                'Authorization': 'Bearer ' + code,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            json: true
        }).then(res => {
            result.push(res.data);
        })
        return result;
    },
    createPlaylist: async function () {
        let code = authHelpers.getCookie();
        let uid = authHelpers.getUserID();
        let pid = "";
        await axios({
            method: 'POST',
            url: 'https://api.spotify.com/v1/users/' + uid + '/playlists',
            headers: {
                'Authorization': 'Bearer ' + code,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                "name": "created by explore-spotify, for " + uid,
                "public": false,
            },
            json: true
        }).then(res => {
            pid = res.data.id;
        })
        await this.populatePlaylist(code, pid);
        window.open("https://open.spotify.com/playlist/" + pid, "_blank");
    },
    populatePlaylist: async function (code, pid) {
        let tUris = JSON.parse(localStorage.getItem("spotiData")).tracks.map(t => t.uri);
        let snapid = "";
        await axios({
            method: 'POST',
            url: 'https://api.spotify.com/v1/playlists/' + pid + '/tracks',
            headers: {
                'Authorization': 'Bearer ' + code,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                "uris": tUris,
                "position": 0,
            },
            json: true
        }).then(res => {
            snapid = res;
        })
        return snapid;
    }
}

export default spotifyHelpers;