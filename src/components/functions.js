import React, { Fragment } from "react";
import spotifyHelpers from "../spotifyHelpers";
import ArtistSearch from "./artistSearch";
import TrackSearch from "./trackSearch";

export default class functions extends React.Component {
    constructor() {
        super();
        this.state = {
            artistsUpdated: false,
            tracksUpdated: false,
            clearResults: false,
            inputsEmpty: true,
        };
        this.timer = null;
        this.artists = null;
        this.tracks = null;

        this.artistInput = React.createRef();
        this.trackInput = React.createRef();
    }

    handleArtistInput = (e) => {
        if (e.value) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.handleArtist(e.value);
                this.setState({ clearResults: false })               
                this.setState({ inputsEmpty: false })
            }, 1000);
        }
        else if (!e.value || e.value.length < 1) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.setState({ clearResults: true })          
                this.setState({ inputsEmpty: true })
            }, 800);
        }
    }

    handleTrackInput = (e) => {
        if (e.value) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.handleTrack(e.value);
                this.setState({ clearResults: false })
                this.setState({ inputsEmpty: false })
            }, 1000);
        }
        else if (!e.value || e.value.length < 1) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.setState({ clearResults: true })
                this.setState({ inputsEmpty: true })
            }, 800);
        }
    }

    handleArtist = async (v) => {
        this.tracks = null;
        this.trackInput.current.value = "";
        this.artists = await spotifyHelpers.searchArtist(v);
        this.setState({ artistsUpdated: true })
    }

    handleTrack = async (v) => {
        this.artists = null;
        this.artistInput.current.value = "";
        this.tracks = await spotifyHelpers.searchTrack(v);
        this.setState({ tracksUpdated: true })
    }

    render() {
        return (
            <div className='results'>
                <div className='funcs'>
                    <input onChange={e => this.handleArtistInput(e.target)} placeholder="pick at most 5 artists.." ref={this.artistInput}></input>
                    <span>OR</span>
                    <input onChange={e => this.handleTrackInput(e.target)} placeholder="pick at most 5 tracks.." ref={this.trackInput}></input>
                </div>
                {!this.state.clearResults ? <Fragment> {this.artists ? <div className='search-container'><ArtistSearch artists={this.artists}></ArtistSearch> </div> : ""}
                    {this.tracks ? <div className='search-container'><TrackSearch tracks={this.tracks}></TrackSearch> </div> : ""}</Fragment> : ""}

                {this.state.inputsEmpty ? <Fragment>
                    <div className='funcs'>
                        <button onClick={e => functions.getbyArtists("medium_term")}>Explore by Recent Top Artists</button>
                        <button onClick={e => functions.getbyTracks("medium_term")}>Explore by Recent Top Tracks</button>
                    </div>
                    <div className='funcs'>
                        <button onClick={e => functions.getbyArtists("long_term")}>Explore by All-Time Top Artists</button>
                        <button onClick={e => functions.getbyTracks("long_term")}>Explore by All-Time Top Tracks</button>
                    </div></Fragment> : ""}
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