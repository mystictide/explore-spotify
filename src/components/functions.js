import React from "react";
import spotifyHelpers from "../spotifyHelpers";
import ArtistSearch from "./artistSearch";

export default class functions extends React.Component {
    constructor() {
        super();
        this.state = {
            artistsUpdated: false,
            tracksUpdated: false
        };
        this.timer = null;
        this.artists = null;
        this.tracks = null;
    }

    handleArtistInput = (e) => {
        if (e.value) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.handleArtist(e.value);
            }, 1000);
        }
    }

    handleTrackInput = (e) => {
        if (e.value) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.handleArtist(e.value);
            }, 1000);
        }
    }

    handleArtist = async (v) => {
        this.artists = await spotifyHelpers.searchArtist(v);
        this.setState({ artistsUpdated: true })
    }

    handleTrack = async (v) => {
        this.tracks = await spotifyHelpers.searchTrack(v);
        this.setState({ tracksUpdated: true })
    }

    render() {
        return (
            <div className='results'>
                <div className='funcs'>
                    <input onChange={e => this.handleArtistInput(e.target)} placeholder="pick at most 5 artists.."></input>
                    <span className="selected">and/or</span>
                    <input onChange={e => this.handleTrackInput(e.target)} placeholder="pick at most 5 tracks.."></input>
                </div>
                {this.artists ? <div className='search-container'><ArtistSearch artists={this.artists}></ArtistSearch> </div> : ""}
                {/* <div className='display'>
                    <span className="selected">selected</span>
                    <span className="items" suggestions={}>muse, testing, beardfish, king crimson, habibi, muse, testing, beardfish, king crimson, habibi</span>
                </div> */}
                <div className='funcs'>
                    <button onClick={e => functions.getbyArtists("medium_term")}>Explore by Recent Top Artists</button>
                    <button onClick={e => functions.getbyTracks("medium_term")}>Explore by Recent Top Tracks</button>
                </div>
                <div className='funcs'>
                    <button onClick={e => functions.getbyArtists("long_term")}>Explore by All-Time Top Artists</button>
                    <button onClick={e => functions.getbyTracks("long_term")}>Explore by All-Time Top Tracks</button>
                </div>
            </div>
        )
    }
}

functions.getbyArtists = (range) => {
    spotifyHelpers.databyAllTimeTopArtists(range);
}

functions.getbyTracks = (range) => {
    spotifyHelpers.databyAllTimeTopTracks(range);
}